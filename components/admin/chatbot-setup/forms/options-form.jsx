import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const OptionForm = ({ className, mode }) => {
  const [options, setOptions] = useState([]);

  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions((prev) => [...prev, { option: "", details: "" }]);
  };

  const handleRemoveOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("flex flex-col space-y-6", className)}>
      <Label htmlFor="reply-title" className="mb-1">
        Reply title
      </Label>
      <Input
        id="reply-title"
        className="bg-util-white"
        disabled={mode === "view"}
      />

      {options?.map((option, index) => (
        <div
          className={`flex gap-6 rounded-md relative ${
            mode === "edit" ? "bg-gray-300/50 p-6" : ""
          }`}
        >
          <div className="flex-1">
            <Label htmlFor={`option-${index}`} className="mb-1">
              Option
            </Label>
            <Input
              id={`option-${index}`}
              value={option.option}
              onChange={(e) =>
                setOptions((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, option: e.target.value } : item
                  )
                )
              }
              className="bg-util-white"
              disabled={mode === "view"}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`details-${index}`} className="mb-1">
              Details
            </Label>
            <Textarea
              id={`details-${index}`}
              value={option.details}
              onChange={(e) =>
                setOptions((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, details: e.target.value } : item
                  )
                )
              }
              className="bg-util-white hover:disabled:cursor-default"
              disabled={mode === "view"}
            />
          </div>
          {mode === "edit" && (
            <div className="flex items-center absolute -top-2 -right-2 bg-orange-600 rounded-full p-1 text-util-white">
              <X
                className="size-4 cursor-pointer"
                onClick={() => handleRemoveOption(index)}
                disabled={mode === "view"}
              />
            </div>
          )}
        </div>
      ))}

      {mode === "edit" && (
        <Button
          onClick={(e) => {
            handleAddOption(e);
          }}
          className="btn-outline max-w-60"
          disabled={mode === "view"}
        >
          + Add Option
        </Button>
      )}
    </div>
  );
};

export default OptionForm;
