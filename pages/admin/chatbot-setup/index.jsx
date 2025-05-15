import ResponseCard from "@/components/admin/chatbot-setup/response-card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/layouts/admin.layout";

const ChatbotPage = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4 bg-util-white">
        <h5 className="text-h5 font-semibold text-gray-900">Chatbot Setup</h5>
      </div>

      <div className="bg-util-white px-20 py-10 mx-20 text-gray-900 mb-32">
        <div className="flex flex-col gap-6">
          <h5 className="font-semibold text-h5 text-gray-600">
            Default Chatbot Messages
          </h5>

          <div>
            <Label htmlFor="greeting-message" className="mb-1">
              Greeting message *
            </Label>
            <Textarea id="greeting-message" className="h-24" />
          </div>

          <div>
            <Label htmlFor="auto-reply-message" className="mb-1">
              Auto-reply message *
            </Label>
            <Textarea id="auto-reply-message" className="h-24" />
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col space-y-10">
          <h5 className="font-semibold text-h5 text-gray-600">
            Suggestion menu & Response
          </h5>

          <ResponseCard />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChatbotPage;
