import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResponseForm from "./response-form";
import { GripVertical, Pencil, Trash, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useChatbotResponse } from "@/hooks/useChatbotResponse";
import { REPLY_FORMAT } from "@/constants/chatbot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const ResponseCard = ({ onRemove, onSave }) => {
  const {
    formData,
    topic,
    replyFormat,
    errors,
    resetForm,
    responseId,
    setResponseId,
    setTopic,
    updateReplyFormat,
    validateForm,
    clearError,
    isLoading,
    setIsLoading,
  } = useChatbotResponse();

  const [mode, setMode] = useState(responseId ? "view" : "edit");

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMode("view");

    try {
      const payload = {
        topic,
        replyFormat,
        data: {},
      };

      if (replyFormat === REPLY_FORMAT.MESSAGE) {
        payload.data.message = formData.message;
      } else if (replyFormat === REPLY_FORMAT.ROOMTYPES) {
        payload.data.buttonName = formData.buttonName;
        payload.data.roomTypes = formData.roomTypes.map((roomType) => roomType.roomTypeId ?? roomType.id);
        payload.data.replyTitle = formData.replyTitle;
      } else if (replyFormat === REPLY_FORMAT.OPTIONS) {
        payload.data.replyTitle = formData.replyTitle;
        payload.data.options = formData.options;
      }

      let response;
      if (responseId) {
        response = await api.put(
          `/admin/chatbot/response?id=${responseId}`,
          payload
        );
      } else {
        response = await api.post("/admin/chatbot/response", payload);
      }

      if (response.data.success) {
        toast.success("Response saved successfully");
        setResponseId(response.data.id);
        setMode("view");

        if (onSave) {
          onSave(response.data);
        }
      }
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error(error.response?.data?.message || "Failed to save response");
      setMode("edit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md flex space-x-6 w-full">
      <div className="flex-1">
        <div className="flex gap-6 w-full">
          <div className="w-full">
            <Label htmlFor="topic" className="mb-1 require-label">
              Topic
            </Label>
            <Input
              id="topic"
              className={cn(
                "bg-util-white placeholder:text-gray-600",
                errors.topic && "border-red-500"
              )}
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (errors.topic) clearError("topic");
              }}
              disabled={isLoading || mode === "view"}
              placeholder="e.g., Room Information, Hotel Services"
            />
            {errors.topic && (
              <p className="text-red-500 text-xs mt-1">{errors.topic}</p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="response" className="mb-1 require-label">
              Reply format
            </Label>
            <Select
              value={replyFormat}
              onValueChange={(value) => {
                updateReplyFormat(value);
                if (errors.replyFormat) clearError("replyFormat");
              }}
              disabled={isLoading || mode === "view"}
            >
              <SelectTrigger
                className={cn(
                  "bg-util-white h-9",
                  errors.replyFormat && "border-red-500",
                  !replyFormat && "text-gray-600"
                )}
              >
                <SelectValue placeholder="Select a reply format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={REPLY_FORMAT.MESSAGE}>Message</SelectItem>
                <SelectItem value={REPLY_FORMAT.ROOMTYPES}>
                  Room type
                </SelectItem>
                <SelectItem value={REPLY_FORMAT.OPTIONS}>
                  Option with details
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.replyFormat && (
              <p className="text-red-500 text-xs mt-1">{errors.replyFormat}</p>
            )}
          </div>
        </div>

        {replyFormat && (
          <>
            <ResponseForm
              replyFormat={replyFormat}
              className="my-6"
              mode={mode}
            />
            {errors.replyFormat && (
              <p className="text-red-500 text-sm mt-1">{errors.replyFormat}</p>
            )}
          </>
        )}

        {mode === "edit" && (
          <div className="mt-6">
            <Button
              className="btn-primary px-8 py-4"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer ml-2"
              onClick={() => {
                if (responseId) {
                  resetForm();
                  setMode("view");
                } else {
                  onRemove();
                }
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col text-gray-700 space-y-4 pt-7">
        {mode === "view" && (
          <Pencil
            className="size-4 cursor-pointer"
            onClick={() => setMode("edit")}
          />
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Trash className="size-4 cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete response</DialogTitle>
              <DialogDescription>
                Do you want to delete this response?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="btn-outline"
                onClick={onRemove}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes, I want to delete"}
              </Button>
              <DialogClose asChild>
                <Button onClick={() => {}} className="btn-primary">
                  No, I don’t
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResponseCard;
