"use client";

import React from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const UploadBox = ({ onClick }) => (
  <div
    className={cn(
      "bg-gray-200 rounded-sm w-[167px] h-[167px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 transition-colors"
    )}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    }}
  >
    <Plus className="size-4 text-orange-500" />
    <p className="text-orange-500 text-sm">Upload photo</p>
  </div>
);

const ImageBox = React.forwardRef(({ children, style, ...props }, ref) => (
  <div
    ref={ref}
    className="w-44 h-44 relative rounded-md overflow-visible border border-input user-select-none"
    style={style}
    {...props}
  >
    {children}
  </div>
));
ImageBox.displayName = "ImageBox";

function SortableImageItem({ id, src, onRemove, index }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  if (!src) {
    return null;
  }

  return (
    <ImageBox ref={setNodeRef} style={style} {...attributes}>
      <div
        className="w-[167px] h-[167px] overflow-hidden rounded-md relative cursor-grab"
        {...listeners}
      >
        <img
          src={src}
          alt={`Room image ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove(id);
        }}
        className="absolute flex items-center justify-center p-1 cursor-pointer
                   -top-2 -right-2 size-6 rounded-full bg-red-600 hover:bg-red-700 z-40"
        aria-label={`Remove image ${index + 1}`}
      >
        <X className="text-white size-4" />
      </button>
    </ImageBox>
  );
}

export default React.forwardRef(function RoomImagesUploader(
  {
    value = [],
    minImages = 4,
    isValid,
    onUpload,
    onRemove,
    onReorder,
  },
  ref
) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const MAX_IMAGES = 10;
  const uploadedImagesCount = value.length;

  const handleUpload = () => {
    if (uploadedImagesCount >= MAX_IMAGES) return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onUpload && onUpload({
            src: event.target.result,
            file: file
          });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !onReorder) return;

    if (active.id !== over.id) {
      const oldIndex = value.findIndex((i) => i.id === active.id);
      const newIndex = value.findIndex((i) => i.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <div className="w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={value.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-6">
            {value.map((item, index) => (
              <SortableImageItem
                key={item.id}
                id={item.id}
                src={item.src}
                index={index}
                onRemove={() => onRemove && onRemove(item.id)}
              />
            ))}
            {uploadedImagesCount < MAX_IMAGES && (
              <div>
                <UploadBox onClick={handleUpload} />
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {!isValid && uploadedImagesCount > 0 && (
        <p className="text-sm text-red-500 mt-2">
          Please upload at least {minImages} images. You have{" "}
          {uploadedImagesCount}.
        </p>
      )}
      {uploadedImagesCount === 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Please upload at least {minImages} images.
        </p>
      )}
    </div>
  );
});
