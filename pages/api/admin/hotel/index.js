import { HTTP_STATUS } from "@/constants/http-status";
import { successResponse, errorResponse } from "@/lib/response-utils";
import { db } from "@/lib/prisma";

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
        status: HTTP_STATUS.METHOD_NOT_ALLOWED,
      });
  }
}

const GET = async (req, res) => {
  try {
    const hotel = await db.hotelMaster.findFirst({
      orderBy: { id: 'asc' }
    });

    if (!hotel) {
      return successResponse({
        res,
        data: {
          hotelName: "Neatly Hotel",
          hotelDescription: `Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation with an outdoor pool, kids' club, sports facilities and a fitness centre. There is also a spa, an indoor pool and saunas.\n\nAll units at the hotel are equipped with a seating area, a flat-screen TV with satellite channels, a dining area and a private bathroom with free toiletries, a bathtub and a hairdryer. Every room in Neatly Hotel features a furnished balcony. Some rooms are equipped with a coffee machine.\n\nFree WiFi and entertainment facilities are available at property and also rentals are provided to explore the area.`,
          hotelUrl: "https://res.cloudinary.com/dhyyl3snm/image/upload/v1749025823/logo_n3isdh.png",
          hotelUrlPublicId: "logo_n3isdh",
        }
      });
    }

    return successResponse({
      res,
      data: {
        hotelName: hotel.hotelName,
        hotelDescription: hotel.hotelDescription,
        hotelUrl: hotel.hotelUrl,
        hotelUrlPublicId: hotel.hotelUrlPublicId,
      }
    });
  } catch (error) {
    console.error("Error fetching hotel information:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch hotel information",
    });
  }
};

const PUT = async (req, res) => {
  try {
    const { hotelName, hotelDescription, hotelUrl, hotelUrlPublicId } = req.body;

    if (!hotelName || !hotelDescription || !hotelUrl || !hotelUrlPublicId) {
      return errorResponse({
        res,
        message: "Hotel name, description, logo, and logo public ID are required",
        status: HTTP_STATUS.BAD_REQUEST
      });
    }

    const updatedConfig = await db.hotelMaster.upsert({
      where: {
        id: (await db.hotelMaster.findFirst({ orderBy: { id: 'asc' } }))?.id || 0
      },
      update: {
        hotelName,
        hotelDescription,
        hotelUrl,
        hotelUrlPublicId,
      },
      create: {
        hotelName,
        hotelDescription,
        hotelUrl,
        hotelUrlPublicId,
      }
    });

    return successResponse({
      res,
      data: {
        id: updatedConfig.id,
        hotelName: updatedConfig.hotelName,
        hotelDescription: updatedConfig.hotelDescription,
        hotelUrl: updatedConfig.hotelUrl,
        hotelUrlPublicId: updatedConfig.hotelUrlPublicId,
      }
    });
  } catch (error) {
    console.error("Error updating hotel information:", error.message);
    return errorResponse({
      res,
      message: "Failed to update hotel information",
    });
  }
}
