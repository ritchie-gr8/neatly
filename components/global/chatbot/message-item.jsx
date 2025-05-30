"use client";

import { SENDER } from "@/constants/chatbot";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "@/lib/chat/message-renderer";

// Dynamic imports for component messages
const RoomTypeMessage = dynamic(() => import("./room-type-message"), {
  loading: () => <div className="p-2">Loading room information...</div>,
});

const OptionsMessage = dynamic(() => import("./options-message"), {
  loading: () => <div className="p-2">Loading options...</div>,
});

const MessageItem = ({ message, onOptionSelect }) => {
  const renderComponent = () => {
    if (!message.isComponent) return null;

    switch (message.componentType) {
      case "ROOMTYPES":
        return <RoomTypeMessage data={message.componentData} />;
      case "OPTIONS":
        return (
          <OptionsMessage
            data={message.componentData}
            onOptionSelect={onOptionSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg relative group",
        {
          "bg-orange-600 text-white rounded-tr-none max-w-2/3":
            message.sender === SENDER.USER,
          "bg-util-white text-gray-700 rounded-tl-none max-w-2/3":
            message.sender === SENDER.BOT,
          "bg-green-500 text-white rounded-tl-none max-w-2/3":
            message.sender === SENDER.ADMIN,
        }
      )}
    >
      {message.isComponent ? renderComponent() : <p>{message.content}</p>}

      {/* <div className="text-xs opacity-0 group-hover:opacity-70 transition-opacity absolute -bottom-5 right-0">
        {formatMessageTime(message.timestamp)}
      </div> */}
    </div>
  );
};

export default MessageItem;
