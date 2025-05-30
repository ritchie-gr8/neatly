import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      return errorResponse({
        res,
        message: "Method not allowed",
        status: HTTP_STATUS.METHOD_NOT_ALLOWED
      });
  }
}

const GET = async (req, res) => {
  try {
    const config = await db.chatbotConfig.findFirst({
      orderBy: { id: 'asc' }
    });

    if (!config) {
      return successResponse({
        res,
        data: {
          greetingMessage: "Hello, how can I help you? from Neatly",
          autoReplyMessage: "I'm sorry, I don't understand. Can you please rephrase? from Neatly",
        }
      });
    }

    return successResponse({
      res,
      data: {
        id: config.id,
        greetingMessage: config.greetingMessage,
        autoReplyMessage: config.autoReplyMessage,
      }
    });
  } catch (error) {
    console.error("Error fetching chatbot messages:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch chatbot messages",
    });
  }
};
