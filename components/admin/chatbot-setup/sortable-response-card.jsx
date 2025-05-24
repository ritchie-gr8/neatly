import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableResponseCard = ({ id, children }) => {
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
      className="mb-4"
    >
      <div className="bg-gray-100 p-6 rounded-md flex space-x-6 relative">
        <div className="absolute top-12 right-6 flex flex-col text-gray-700 space-y-4 z-10">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className={`cursor-grab ${isDragging ? 'text-orange-500' : ''}`}
            aria-label="Drag to reorder response"
          >
            <GripVertical className="size-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SortableResponseCard;
