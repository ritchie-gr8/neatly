import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    case "PUT":
      return PUT(req, res);
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

const PUT = async (req, res) => {
  try {
    const { greetingMessage, autoReplyMessage } = req.body;

    if (!greetingMessage || !autoReplyMessage) {
      return errorResponse({
        res,
        message: "Greeting message and auto reply message are required",
        status: HTTP_STATUS.BAD_REQUEST
      });
    }

    const updatedConfig = await db.chatbotConfig.upsert({
      where: {
        id: (await db.chatbotConfig.findFirst({ orderBy: { id: 'asc' } }))?.id || 0
      },
      update: {
        greetingMessage,
        autoReplyMessage,
      },
      create: {
        greetingMessage,
        autoReplyMessage,
      }
    });

    return successResponse({
      res,
      data: {
        id: updatedConfig.id,
        greetingMessage: updatedConfig.greetingMessage,
        autoReplyMessage: updatedConfig.autoReplyMessage,
      }
    });
  } catch (error) {
    console.error("Error updating chatbot messages:", error.message);
    return errorResponse({
      res,
      message: "Failed to update chatbot messages",
    });
  }
};
