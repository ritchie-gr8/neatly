import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    case "POST":
      return POST(req, res);
    case "PUT":
      return PUT(req, res);
    case "DELETE":
      return DELETE(req, res);
    default:
      return errorResponse({
        res,
        message: "Method not allowed",
        status: HTTP_STATUS.METHOD_NOT_ALLOWED,
      });
  }
}

const GET = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const response = await db.chatbotResponse.findUnique({
        where: { id: parseInt(id) },
        include: {
          messageResponse: true,
          roomTypeResponse: {
            include: {
              roomTypes: true,
            },
          },
          optionsResponse: {
            include: {
              options: true,
            },
          },
        },
      });

      if (!response) {
        return errorResponse({
          res,
          message: "Chatbot response not found",
          status: HTTP_STATUS.NOT_FOUND,
        });
      }

      return successResponse({
        res,
        data: response,
      });
    }

    const responses = await db.chatbotResponse.findMany({
      include: {
        messageResponse: true,
        roomTypeResponse: {
          include: {
            roomTypes: true,
          },
        },
        optionsResponse: {
          include: {
            options: true,
          },
        },
      },
      orderBy: [
        { order: "asc" },
        { id: "asc" },
      ],
    });

    return successResponse({
      res,
      data: {
        responses,
      },
    });
  } catch (error) {
    console.error("Error fetching chatbot responses:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch chatbot responses",
    });
  }
};

const POST = async (req, res) => {
  try {
    const { topic, replyFormat, data } = req.body;

    if (!topic || !replyFormat) {
      return errorResponse({
        res,
        message: "Topic and reply format are required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    // Get the highest order value to place the new response at the end
    const highestOrder = await db.chatbotResponse.findFirst({
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const newOrder = highestOrder ? highestOrder.order + 1 : 0;

    const chatbotResponse = await db.chatbotResponse.create({
      data: {
        topic,
        replyFormat,
        order: newOrder,
      },
    });

    // Validate data based on reply format
    const validationError = validateResponseData(replyFormat, data, res);
    if (validationError) {
      // Clean up the created response if validation fails
      await db.chatbotResponse.delete({ where: { id: chatbotResponse.id } });
      return validationError;
    }

    switch (replyFormat) {
      case "MESSAGE": {
        const messageResponse = await db.messageResponse.create({
          data: {
            message: data.message,
            responseId: chatbotResponse.id,
          },
        });

        return successResponse({
          res,
          data: {
            ...chatbotResponse,
            messageResponse,
          },
          status: HTTP_STATUS.CREATED,
        });
      }

      case "ROOMTYPES": {
        const roomTypeResponse = await db.roomTypeResponse.create({
          data: {
            replyTitle: data.replyTitle,
            buttonName: data.buttonName,
            responseId: chatbotResponse.id,
          },
        });

        const roomTypeConnections = await Promise.all(
          data.roomTypes.map(async (roomTypeId) => {
            return db.roomTypeOnResponse.create({
              data: {
                roomTypeId: parseInt(roomTypeId),
                roomTypeResponseId: roomTypeResponse.id,
              },
            });
          })
        );

        return successResponse({
          res,
          data: {
            ...chatbotResponse,
            roomTypeResponse: {
              ...roomTypeResponse,
              roomTypes: roomTypeConnections,
            },
          },
          status: HTTP_STATUS.CREATED,
        });
      }

      case "OPTIONS": {
        const optionsResponse = await db.optionsResponse.create({
          data: {
            replyTitle: data.replyTitle,
            responseId: chatbotResponse.id,
          },
        });

        const options = await Promise.all(
          data.options.map(async (option) => {
            return db.option.create({
              data: {
                optionText: option.optionText,
                detailsText: option.detailsText,
                optionsResponseId: optionsResponse.id,
              },
            });
          })
        );

        return successResponse({
          res,
          data: {
            ...chatbotResponse,
            optionsResponse: {
              ...optionsResponse,
              options,
            },
          },
          status: HTTP_STATUS.CREATED,
        });
      }

      default:
        await db.chatbotResponse.delete({ where: { id: chatbotResponse.id } });
        return errorResponse({
          res,
          message: "Invalid reply format",
          status: HTTP_STATUS.BAD_REQUEST,
        });
    }
  } catch (error) {
    console.error("Error creating chatbot response:", error.message);
    return errorResponse({
      res,
      message: "Failed to create chatbot response",
      error: error.message,
    });
  }
};

const validateResponseData = (replyFormat, data, res) => {
  switch (replyFormat) {
    case "MESSAGE":
      if (!data.message) {
        return errorResponse({
          res,
          message: "Message content is required",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }
      break;

    case "ROOMTYPES":
      if (!data.replyTitle) {
        return errorResponse({
          res,
          message: "Reply title is required",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }

      if (!data.buttonName) {
        return errorResponse({
          res,
          message: "Button name is required",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }

      if (!data.roomTypes || !Array.isArray(data.roomTypes) || data.roomTypes.length === 0) {
        return errorResponse({
          res,
          message: "At least one room type must be selected",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }
      break;

    case "OPTIONS":
      if (!data.replyTitle) {
        return errorResponse({
          res,
          message: "Reply title is required",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }

      if (!data.options || !Array.isArray(data.options) || data.options.length === 0) {
        return errorResponse({
          res,
          message: "At least one option must be provided",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }

      for (const option of data.options) {
        if (!option.optionText) {
          return errorResponse({
            res,
            message: "Option text is required for all options",
            status: HTTP_STATUS.BAD_REQUEST,
          });
        }
        if (!option.detailsText) {
          return errorResponse({
            res,
            message: "Details text is required for all options",
            status: HTTP_STATUS.BAD_REQUEST,
          });
        }
      }
      break;

    default:
      return errorResponse({
        res,
        message: "Invalid reply format",
        status: HTTP_STATUS.BAD_REQUEST,
      });
  }

  return null;
};

const cleanupExistingResponses = async (existingResponse, currentFormat) => {
  if (existingResponse.messageResponse && currentFormat !== "MESSAGE") {
    await db.messageResponse.delete({
      where: { id: existingResponse.messageResponse.id },
    });
  }

  // Clean up room type response if it exists and not the current format
  if (existingResponse.roomTypeResponse && currentFormat !== "ROOMTYPES") {
    // First delete the connections
    await db.roomTypeOnResponse.deleteMany({
      where: { roomTypeResponseId: existingResponse.roomTypeResponse.id },
    });
    // Then delete the response
    await db.roomTypeResponse.delete({
      where: { id: existingResponse.roomTypeResponse.id },
    });
  }

  // Clean up options response if it exists and not the current format
  if (existingResponse.optionsResponse && currentFormat !== "OPTIONS") {
    // First delete the options
    await db.option.deleteMany({
      where: { optionsResponseId: existingResponse.optionsResponse.id },
    });
    // Then delete the response
    await db.optionsResponse.delete({
      where: { id: existingResponse.optionsResponse.id },
    });
  }
};

const PUT = async (req, res) => {
  try {
    const { id } = req.query;
    const { topic, replyFormat, data } = req.body;

    if (!id) {
      return errorResponse({
        res,
        message: "Response ID is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const existingResponse = await db.chatbotResponse.findUnique({
      where: { id: parseInt(id) },
      include: {
        messageResponse: true,
        roomTypeResponse: {
          include: {
            roomTypes: true,
          },
        },
        optionsResponse: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!existingResponse) {
      return errorResponse({
        res,
        message: "Chatbot response not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    const validationError = validateResponseData(replyFormat, data, res);
    if (validationError) return validationError;

    const updatedResponse = await db.chatbotResponse.update({
      where: { id: parseInt(id) },
      data: {
        topic,
        replyFormat,
      },
    });

    await cleanupExistingResponses(existingResponse, replyFormat);

    switch (replyFormat) {
      case "MESSAGE": {
        const messageResponse = await db.messageResponse.upsert({
          where: {
            id: existingResponse.messageResponse?.id || -1,
          },
          update: {
            message: data.message,
          },
          create: {
            message: data.message,
            responseId: updatedResponse.id,
          },
        });

        return successResponse({
          res,
          data: {
            ...updatedResponse,
            messageResponse,
          },
          message: "Chatbot message response updated successfully",
        });
      }

      case "ROOMTYPES": {
        if (existingResponse.roomTypeResponse) {
          await db.roomTypeOnResponse.deleteMany({
            where: { roomTypeResponseId: existingResponse.roomTypeResponse.id },
          });
        }

        const roomTypeResponse = await db.roomTypeResponse.upsert({
          where: {
            id: existingResponse.roomTypeResponse?.id || -1,
          },
          update: {
            replyTitle: data.replyTitle,
            buttonName: data.buttonName,
          },
          create: {
            replyTitle: data.replyTitle,
            buttonName: data.buttonName,
            responseId: updatedResponse.id,
          },
        });

        const roomTypeConnections = await Promise.all(
          data.roomTypes.map(async (roomTypeId) => {
            return db.roomTypeOnResponse.create({
              data: {
                roomTypeId: parseInt(roomTypeId),
                roomTypeResponseId: roomTypeResponse.id,
              },
            });
          })
        );

        return successResponse({
          res,
          data: {
            ...updatedResponse,
            roomTypeResponse: {
              ...roomTypeResponse,
              roomTypes: roomTypeConnections.map(conn => ({ roomTypeId: conn.roomTypeId })),
            },
          },
          message: "Chatbot room type response updated successfully",
        });
      }

      case "OPTIONS": {
        if (existingResponse.optionsResponse) {
          await db.option.deleteMany({
            where: { optionsResponseId: existingResponse.optionsResponse.id },
          });
        }

        const optionsResponse = await db.optionsResponse.upsert({
          where: {
            id: existingResponse.optionsResponse?.id || -1,
          },
          update: {
            replyTitle: data.replyTitle,
          },
          create: {
            replyTitle: data.replyTitle,
            responseId: updatedResponse.id,
          },
        });

        const options = await Promise.all(
          data.options.map(async (option) => {
            return db.option.create({
              data: {
                optionText: option.optionText,
                detailsText: option.detailsText,
                optionsResponseId: optionsResponse.id,
              },
            });
          })
        );

        return successResponse({
          res,
          data: {
            ...updatedResponse,
            optionsResponse: {
              ...optionsResponse,
              options,
            },
          },
          message: "Chatbot options response updated successfully",
        });
      }

      default:
        return errorResponse({
          res,
          message: "Invalid reply format",
          status: HTTP_STATUS.BAD_REQUEST,
        });
    }
  } catch (error) {
    console.error("Error updating chatbot response:", error.message);
    return errorResponse({
      res,
      message: "Failed to update chatbot response",
      error: error.message,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return errorResponse({
        res,
        message: "Response ID is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const existingResponse = await db.chatbotResponse.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingResponse) {
      return errorResponse({
        res,
        message: "Chatbot response not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    await db.chatbotResponse.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({
      res,
      data: {
        message: "Chatbot response deleted successfully",
      },
    });
  } catch (error) {
    console.error("Error deleting chatbot response:", error.message);
    return errorResponse({
      res,
      message: "Failed to delete chatbot response",
      error: error.message,
    });
  }
};
