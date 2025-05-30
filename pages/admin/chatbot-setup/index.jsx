import ResponseCard from "@/components/admin/chatbot-setup/response-card";
import SortableResponseCard from "@/components/admin/chatbot-setup/sortable-response-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/layouts/admin.layout";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatbotResponseProvider } from "@/contexts/chatbot-response-context";

// Import drag and drop libraries
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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const chatbotMessagesSchema = z.object({
  greetingMessage: z.string().min(1, "Greeting message is required"),
  autoReplyMessage: z.string().min(1, "Auto reply message is required"),
});

const ChatbotPage = () => {
  const [responseList, setResponseList] = useState([]);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [configId, setConfigId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingResponses, setIsLoadingResponses] = useState(false);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const form = useForm({
    resolver: zodResolver(chatbotMessagesSchema),
    defaultValues: {
      greetingMessage: "",
      autoReplyMessage: "",
    },
  });

  const formValues = form.watch();
  const [originalValues, setOriginalValues] = useState({
    greetingMessage: "",
    autoReplyMessage: "",
  });

  const handleAddResponse = () => {
    setResponseList((prev) => [...prev, { isNew: true }]);
  };

  const handleRemoveResponse = async (index, id) => {
    if (id) {
      try {
        const response = await api.delete(`/admin/chatbot/response?id=${id}`);
        if (response.data.success) {
          console.log(response.data);
          toast.success("Response deleted successfully");
          setResponseList((prev) => prev.filter((_, i) => i !== index));
        }
      } catch (error) {
        console.error("Error deleting response:", error);
        toast.error("Failed to delete response");
      }
    } else {
      setResponseList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleResponseSave = (index, data) => {
    setResponseList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, ...data, isNew: false } : item
      )
    );
  };

  // Handle the drag and drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setResponseList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Reorder the array
        const reordered = arrayMove(items, oldIndex, newIndex);

        // Update the order property for each item
        const updated = reordered.map((item, index) => ({
          ...item,
          order: index
        }));

        // Save the new order to the backend
        saveResponseOrder(updated);

        return updated;
      });
    }
  };

  // Save the order to the backend
  const saveResponseOrder = async (orderedResponses) => {
    try {
      // Only update responses that have an ID (are saved in the database)
      const responsesToUpdate = orderedResponses
        .filter(r => r.id) // Filter out unsaved responses
        .map(r => ({ id: r.id, order: r.order }));

      if (responsesToUpdate.length > 0) {
        await api.put('/admin/chatbot/response-order', {
          responses: responsesToUpdate
        });
      }
    } catch (error) {
      console.error('Failed to update response order:', error);
      toast.error('Failed to save the new order. Please try again.');
    }
  };

  const handleMessagesSave = async (data) => {
    try {
      setIsLoading(true);
      const response = await api.put("/admin/chatbot/message", {
        greetingMessage: data.greetingMessage,
        autoReplyMessage: data.autoReplyMessage,
      });
      const { success, id } = response.data;

      if (success) {
        setIsFormDirty(false);
        setConfigId(id);
        setOriginalValues({
          greetingMessage: data.greetingMessage,
          autoReplyMessage: data.autoReplyMessage,
        });
        toast.success("Chatbot messages updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update chatbot messages");
      console.error("Error updating chatbot messages:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/admin/chatbot/message");
      const { success, greetingMessage, autoReplyMessage, id } = data;

      if (success) {
        form.reset({
          greetingMessage,
          autoReplyMessage,
        });

        setConfigId(id);
        setOriginalValues({
          greetingMessage,
          autoReplyMessage,
        });
      }
    } catch (error) {
      console.error("Error fetching chatbot messages:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResponses = async () => {
    setIsLoadingResponses(true);
    try {
      const { data } = await api.get("/admin/chatbot/response");
      if (data.success && data.responses) {
        setResponseList(data.responses);
      }
    } catch (error) {
      console.error("Error fetching chatbot responses:", error);
    } finally {
      setIsLoadingResponses(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchResponses();
  }, []);

  useEffect(() => {
    const isDirty =
      formValues.greetingMessage !== originalValues.greetingMessage ||
      formValues.autoReplyMessage !== originalValues.autoReplyMessage;

    setIsFormDirty(isDirty);
  }, [formValues, originalValues]);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4 bg-util-white">
        <h5 className="text-h5 font-semibold text-gray-900">Chatbot Setup</h5>
      </div>

      <div className="bg-util-white px-20 py-10 mx-20 text-gray-900 mb-32">
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32" />
          </div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleMessagesSave)}
                className="flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-semibold text-h5 text-gray-600">
                    Default Chatbot Messages
                  </h5>
                  {(isFormDirty || !configId) && (
                    <Button type="submit" className="btn-primary px-8 py-4">
                      Save
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="greetingMessage"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel required className="mb-1">
                        Greeting message
                      </FormLabel>
                      <FormControl>
                        <Textarea className="h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autoReplyMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required className="mb-1">
                        Auto-reply message
                      </FormLabel>
                      <FormControl>
                        <Textarea className="h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </>
        )}

        <Separator className="my-10" />

        <div className="flex flex-col space-y-10">
          <h5 className="font-semibold text-h5 text-gray-600">
            Suggestion menu & Response
          </h5>

          {isLoadingResponses ? (
            <div className="space-y-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          ) : responseList?.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={responseList.filter(r => r.id).map(r => r.id)}
                strategy={verticalListSortingStrategy}
              >
                {responseList.map((response, index) => (
                  response.id ? (
                    // Draggable component for saved responses
                    <SortableResponseCard key={response.id} id={response.id}>
                      <ChatbotResponseProvider initialData={response}>
                        <ResponseCard
                          onRemove={() => handleRemoveResponse(index, response.id)}
                          onSave={(data) => handleResponseSave(index, data)}
                        />
                      </ChatbotResponseProvider>
                    </SortableResponseCard>
                  ) : (
                    // Non-draggable for unsaved responses
                    <ChatbotResponseProvider key={index} initialData={response}>
                      <ResponseCard
                        onRemove={() => handleRemoveResponse(index, response.id)}
                        onSave={(data) => handleResponseSave(index, data)}
                      />
                    </ChatbotResponseProvider>
                  )
                ))}
              </SortableContext>
            </DndContext>
          ) : null}

          <Button
            onClick={() => handleAddResponse()}
            className="btn-outline max-w-60"
          >
            + Add Suggestion menu
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChatbotPage;
