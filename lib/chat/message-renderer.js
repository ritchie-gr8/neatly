export const processMessage = (message) => {
  try {
    const isJson =
      typeof message.content === "string" &&
      message.content.startsWith("{") &&
      message.content.endsWith("}");

    if (isJson) {
      const parsedContent = JSON.parse(message.content);
      const componentType = parsedContent.componentType;

      return {
        content: parsedContent.text,
        rawContent: message.content,
        componentType: parsedContent.componentType,
        componentData: parsedContent.content,
        sender: message.sender,
        timestamp: message.timestamp,
        isComponent: true
      };
    } else {
      return {
        content: message.content,
        sender: message.sender,
        timestamp: message.timestamp,
        isComponent: false
      };
    }
  } catch (e) {
    console.error("Error processing message:", e);
    return {
      content: message.content,
      sender: message.sender,
      timestamp: message.timestamp,
      isComponent: false
    };
  }
};

export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
