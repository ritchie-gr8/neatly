import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useChatbotResponse } from "@/hooks/useChatbotResponse";

const MessageForm = ({ className, mode }) => {
  const { formData, updateFormData, errors, clearError, isLoading } = useChatbotResponse();

  const handleChange = (e) => {
    updateFormData({ message: e.target.value });
    if (errors.message) clearError("message");
  };

  return (
    <div className={className}>
      <Label htmlFor="message" className="mb-1 require-label">
        Message
      </Label>
      <Textarea
        id="message"
        className={`bg-util-white h-24 disabled:cursor-default ${
          errors?.message ? "border-red-500" : ""
        }`}
        disabled={isLoading || mode === "view"}
        value={formData?.message}
        onChange={handleChange}
        placeholder="Enter your response message here"
      />
      {errors?.message && (
        <p className="text-red-500 text-sm mt-1">{errors?.message}</p>
      )}
    </div>
  );
};

export default MessageForm;
