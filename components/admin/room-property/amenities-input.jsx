"use client";

import React, { useState, useEffect } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableAmenityItem({ id, name, index, onChangeName, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-center gap-2 p-2 mb-2")}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="p-1.5 cursor-grab touch-none text-gray-500 hover:text-gray-700"
        aria-label={`Drag to reorder amenity ${index + 1}`}
      >
        <GripVertical size={20} />
      </button>
      <input
        type="text"
        value={name}
        onChange={(e) => onChangeName(id, e.target.value)}
        placeholder={`Amenity ${index + 1}`}
        className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-label={`Amenity name for item ${index + 1}`}
      />
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="p-1.5 text-red-500 hover:text-red-700"
        aria-label={`Delete amenity ${index + 1}`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default React.forwardRef(function DraggableAmenitiesInput(
  { value = [], onChange, maxAmenities = 10 },
  ref
) {
  const isFirstRender = React.useRef(true);

  const [amenities, setAmenities] = useState(() => {
    return value.length > 0
      ? value.map((item, index) => ({
          id:
            item.id ||
            `amenity-${Date.now()}-${index}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          name: item.name || "",
        }))
      : [];
  });

  // Effect to notify parent of internal changes
  useEffect(() => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
      return;
    }

    const externalValue = amenities.map((a) => ({ id: a.id, name: a.name }));
    onChange(externalValue);
  }, [amenities, onChange]);

  // Effect to sync with external value changes
  useEffect(() => {
    // Only update if the external value is different from current amenities
    // This avoids infinite loops and unnecessary updates
    if (value && value.length > 0) {
      const externalIds = value.map((item) => item.id).filter(Boolean);
      const currentIds = amenities.map((item) => item.id);

      // Check if arrays have different lengths or different items
      const hasChanged =
        externalIds.length !== currentIds.length ||
        externalIds.some((id, index) => id !== currentIds[index]);

      if (hasChanged) {
        const newAmenities = value.map((item, index) => ({
          id:
            item.id ||
            `amenity-${Date.now()}-${index}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          name: item.name || "",
        }));
        setAmenities(newAmenities);
      }
    }
  }, [value]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddAmenity = () => {
    const newAmenityId = `amenity-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    setAmenities((prev) => [...prev, { id: newAmenityId, name: "" }]);
  };

  const handleRemoveAmenity = (idToRemove) => {
    setAmenities((prev) => prev.filter((amenity) => amenity.id !== idToRemove));
  };

  const handleChangeAmenityName = (idToChange, newName) => {
    setAmenities((prev) =>
      prev.map((amenity) =>
        amenity.id === idToChange ? { ...amenity, name: newName } : amenity
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAmenities((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
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
          items={amenities.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          {amenities.map((amenity, index) => (
            <SortableAmenityItem
              key={amenity.id}
              id={amenity.id}
              name={amenity.name}
              index={index}
              onChangeName={handleChangeAmenityName}
              onRemove={handleRemoveAmenity}
            />
          ))}
        </SortableContext>
      </DndContext>

      {(!maxAmenities || amenities.length < maxAmenities) && (
        <button
          type="button"
          onClick={handleAddAmenity}
          className="cursor-pointer mt-3 flex items-center justify-center px-4 py-2 border border-orange-500 text-orange-500
          rounded-md hover:bg-orange-50 transition-colors text-base font-semibold font-open-sans"
          disabled={amenities.length >= maxAmenities}
        >
          <Plus size={16} className="mr-2" />
          Add Amenity
        </button>
      )}
    </div>
  );
});
