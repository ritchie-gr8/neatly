import React, { useState } from "react";
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
import { GripVertical, Pencil, Trash } from "lucide-react";

const ResponseCard = () => {
  const [topic, setTopic] = useState("");
  const [replyFormat, setReplyFormat] = useState("");

  return (
    <div className="bg-gray-100 p-6 rounded-md flex space-x-6">
      <div className="flex-1">
        <div className="flex gap-6 w-full">
          <div className="w-full">
            <Label htmlFor="topic" className="mb-1">
              Topic *
            </Label>
            <Input
              id="topic"
              className="bg-util-white"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="response" className="mb-1">
              Reply format
            </Label>
            <Select value={replyFormat} onValueChange={setReplyFormat}>
              <SelectTrigger className="bg-util-white">
                <SelectValue placeholder="Select a reply format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="room-type">Room type</SelectItem>
                <SelectItem value="message">Message</SelectItem>
                <SelectItem value="option">Option with details</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ResponseForm replyFormat={replyFormat} className="my-6" />

        <div className="mt-6">
          <Button className="btn-primary px-8 py-4">Save</Button>
          <Button variant="ghost" className="cursor-pointer">
            Cancel
          </Button>
        </div>
      </div>
      <div className="flex flex-col text-gray-700 space-y-4">
        <GripVertical className="size-4 cursor-grab" />
        <Pencil className="size-4 cursor-pointer" />
        <Trash className="size-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default ResponseCard;
