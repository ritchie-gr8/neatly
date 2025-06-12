import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";

/**
 * API endpoint to fetch chatbot responses by topic
 * This is used by the frontend chatbot to get appropriate responses for user queries
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { topic } = req.query;

    if (!topic) {
      return errorResponse({
        res,
        message: "Topic is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    // Find the response with the matching topic (case insensitive)
    const chatbotResponse = await db.chatbotResponse.findFirst({
      where: {
        topic: {
          equals: topic,
          mode: 'insensitive',
        },
      },
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

    if (!chatbotResponse) {
      return errorResponse({
        res,
        message: "Chatbot response not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // Create a structured response based on the reply format
    let responseData;

    switch (chatbotResponse.replyFormat) {
      case "MESSAGE":
        responseData = {
          type: "MESSAGE",
          data: {
            message: chatbotResponse.messageResponse.message
          }
        };
        break;

      case "ROOMTYPES": {
        // For room types, we need to fetch the actual room data
        const roomTypeResponse = chatbotResponse.roomTypeResponse;

        // Get room type IDs from the junction table
        const roomTypeIds = roomTypeResponse.roomTypes.map(rtr => rtr.roomTypeId);

        // Fetch the room type data with room images
        const roomTypesData = await db.roomType.findMany({
          where: {
            id: {
              in: roomTypeIds
            }
          },
          select: {
            id: true,
            name: true,
            description: true,
            pricePerNight: true,
            promotionPrice: true,
            isPromotion: true,
            capacity: true,
            roomSize: true,
            roomImages: {
              select: {
                imageUrl: true,
                imageDefault: true,
                imageOrder: true
              },
              orderBy: {
                imageOrder: 'asc'
              }
            }
          }
        });

        responseData = {
          type: "ROOMTYPES",
          data: {
            title: roomTypeResponse.replyTitle, // Use the replyTitle field instead of buttonName
            buttonName: roomTypeResponse.buttonName,
            roomTypes: roomTypesData.map(roomType => {
              // Find the default image or use the first image
              const mainImage = roomType.roomImages.find(img => img.imageDefault) || roomType.roomImages[0];

              return {
                id: roomType.id,
                name: roomType.name || 'Unnamed Room',
                description: roomType.description || 'No description available',
                imageUrl: mainImage ? mainImage.imageUrl : null,
                pricePerNight: roomType.pricePerNight.toString(),
                promotionPrice: roomType.promotionPrice?.toString(),
                isPromotion: roomType.isPromotion,
                capacity: roomType.capacity,
                roomSize: roomType.roomSize
              };
            })
          }
        };
        break;
      }

      case "OPTIONS": {
        // For options, return structured data for rendering cards
        const optionsResponse = chatbotResponse.optionsResponse;

        responseData = {
          type: "OPTIONS",
          data: {
            title: optionsResponse.replyTitle,
            options: optionsResponse.options.map(option => ({
              optionText: option.optionText,
              detailsText: option.detailsText
            }))
          }
        };
        break;
      }

      default:
        responseData = {
          type: "MESSAGE",
          data: {
            message: "Sorry, I couldn't find a response for that topic."
          }
        };
    }

    return successResponse({
      res,
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching chatbot response:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch chatbot response",
    });
  }
}
