import { REPLY_FORMAT } from "@/constants/chatbot";
import { createContext, useState } from "react";

export const ChatbotResponseContext = createContext();

const getInitialData = (initialData) => {
  if (!initialData) return {};

  switch (initialData.replyFormat) {
    case REPLY_FORMAT.MESSAGE:
      return initialData.messageResponse;
    case REPLY_FORMAT.ROOMTYPES:
      return initialData.roomTypeResponse;
    case REPLY_FORMAT.OPTIONS:
      return initialData.optionsResponse;
    default:
      return {};
  }
};

export function ChatbotResponseProvider({ children, initialData }) {
  const [responseId, setResponseId] = useState(initialData?.id || null);
  const [formData, setFormData] = useState(getInitialData(initialData));
  const [errors, setErrors] = useState({});
  const [topic, setTopic] = useState(initialData?.topic || "");
  const [replyFormat, setReplyFormat] = useState(
    initialData?.replyFormat || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const clearError = (field) => {
    const newError = { ...errors };
    delete newError[field];
    setErrors(newError);
  };

  const updateReplyFormat = (format) => {
    if (format === replyFormat) return;

    setReplyFormat(format);
    setFormData(getInitialData(initialData));
    clearError("replyFormat");
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!topic) {
      newErrors.topic = "Topic is required";
      isValid = false;
    }

    if (!replyFormat) {
      newErrors.replyFormat = "Reply format is required";
      isValid = false;
    }

    if (replyFormat === REPLY_FORMAT.MESSAGE) {
      if (!formData.message || formData.message?.trim() === "") {
        newErrors.message = "Message content is required";
        isValid = false;
      }
    } else if (replyFormat === REPLY_FORMAT.ROOMTYPES) {
      if (!formData.roomTypes || formData.roomTypes?.length === 0) {
        newErrors.roomTypes = "At least one room type must be selected";
        isValid = false;
      }

      if (!formData.buttonName || formData.buttonName.trim() === "") {
        newErrors.buttonName = "Button name is required";
        isValid = false;
      }
    } else if (replyFormat === REPLY_FORMAT.OPTIONS) {
      if (!formData.replyTitle || formData.replyTitle.trim() === "") {
        newErrors.replyTitle = "Reply title is required";
        isValid = false;
      }

      if (!formData.options || formData.options.length === 0) {
        newErrors.options = "At least one option must be added";
        isValid = false;
      } else {
        // Validate each option
        const optionErrors = [];
        let hasOptionError = false;

        formData.options.forEach((option, index) => {
          const optionError = {};

          if (!option.optionText || option.optionText.trim() === "") {
            optionError.optionText = "Option text is required";
            hasOptionError = true;
          }

          if (!option.detailsText || option.detailsText.trim() === "") {
            optionError.detailsText = "Option details is required";
            hasOptionError = true;
          }

          if (Object.keys(optionError).length > 0) {
            optionErrors[index] = optionError;
          }
        });

        if (hasOptionError) {
          newErrors.options = optionErrors;
          isValid = false;
        }
      }
    }

    console.log(formData);
    console.log(newErrors);
    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(getInitialData(initialData));
    setErrors({});
    setTopic(initialData?.topic || "");
    setReplyFormat(initialData?.replyFormat || "");
  };

  return (
    <ChatbotResponseContext.Provider
      value={{
        formData,
        errors,
        topic,
        replyFormat,
        responseId,
        initialData,
        isLoading,
        setIsLoading,
        setResponseId,
        setTopic,
        updateReplyFormat,
        updateFormData,
        clearError,
        validateForm,
        resetForm,
      }}
    >
      {children}
    </ChatbotResponseContext.Provider>
  );
}
