import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useChatbotResponse } from "@/hooks/useChatbotResponse";

const OptionForm = ({ className, mode }) => {
  const { formData, updateFormData, errors, clearError, isLoading } =
    useChatbotResponse();

  useEffect(() => {
    if (!formData.options) {
      updateFormData({ options: [], replyTitle: "" });
    }
  }, [formData, updateFormData]);

  const handleAddOption = (e) => {
    e.preventDefault();
    const currentOptions = formData.options || [];
    updateFormData({
      options: [...currentOptions, { optionText: "", detailsText: "" }],
    });
    if (errors.options) clearError("options");
  };

  const handleRemoveOption = (index) => {
    const newOptions = (formData.options || []).filter((_, i) => i !== index);
    updateFormData({ options: newOptions });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = (formData.options || []).map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateFormData({ options: newOptions });
    if (errors.options) clearError("options");
  };

  const handleTitleChange = (e) => {
    updateFormData({ replyTitle: e.target.value });
    if (errors.replyTitle) clearError("replyTitle");
  };

  return (
    <div className={cn("flex flex-col space-y-6", className)}>
      <div>
        <Label htmlFor="reply-title" className="mb-1 require-label">
          Reply title
        </Label>
        <Input
          id="reply-title"
          className={cn("bg-util-white", errors?.replyTitle && "border-red-500")}
          disabled={isLoading || mode === "view"}
          value={formData?.replyTitle || ""}
          onChange={handleTitleChange}
          placeholder="Enter a title for this option set"
        />
        {errors?.replyTitle && (
          <p className="text-red-500 text-sm mt-1">{errors?.replyTitle}</p>
        )}
      </div>

      {(formData?.options || []).map((option, index) => (
        <div
          key={index}
          className={`flex gap-6 rounded-md relative ${
            mode === "edit" ? "bg-gray-300/50 p-6" : ""
          }`}
        >
          <div className="flex-1">
            <Label htmlFor={`option-${index}`} className="mb-1 require-label">
              Option
            </Label>
            <Input
              id={`option-${index}`}
              value={option.optionText || ""}
              onChange={(e) =>
                handleOptionChange(index, "optionText", e.target.value)
              }
              className={cn(
                "bg-util-white",
                errors?.options &&
                  errors.options[index]?.optionText &&
                  "border-red-500"
              )}
              disabled={isLoading || mode === "view"}
              placeholder="Enter option text"
            />
            {errors?.options && errors.options[index]?.optionText && (
              <p className="text-red-500 text-xs mt-1">
                {errors.options[index].optionText}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor={`details-${index}`} className="mb-1 require-label">
              Details
            </Label>
            <Textarea
              id={`details-${index}`}
              value={option.detailsText || ""}
              onChange={(e) =>
                handleOptionChange(index, "detailsText", e.target.value)
              }
              className={cn("bg-util-white hover:disabled:cursor-default", errors?.options && errors.options[index]?.detailsText && "border-red-500")}
              disabled={isLoading || mode === "view"}
              placeholder="Enter additional details"
            />
            {errors?.options && errors.options[index]?.detailsText && (
              <p className="text-red-500 text-xs mt-1">
                {errors.options[index].detailsText}
              </p>
            )}
          </div>
          {mode === "edit" && (
            <div className="flex items-center absolute -top-2 -right-2 bg-orange-600 rounded-full p-1 text-util-white">
              <X
                className="size-4 cursor-pointer"
                onClick={() => handleRemoveOption(index)}
                disabled={isLoading || mode === "view"}
              />
            </div>
          )}
        </div>
      ))}

      {mode === "edit" && (
        <div>
          <Button
            onClick={handleAddOption}
            className="btn-outline max-w-60"
            disabled={isLoading || mode === "view"}
            type="button"
          >
            + Add Option
          </Button>
          {errors?.options && typeof errors.options === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.options}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionForm;
