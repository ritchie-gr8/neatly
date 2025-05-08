import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return DELETE(req, res);
    case "PATCH":
      return PATCH(req, res);
    default:
      return errorResponse({
        res,
        message: "Method not allowed",
        status: HTTP_STATUS.METHOD_NOT_ALLOWED,
      });
  }
}

const PATCH = async (req, res) => {
  const { id } = req.query;
  try {
    const roomId = Number(id);
    const existingRoom = await db.room.findUnique({
      where: { id: roomId },
    });

    if (!existingRoom) {
      return res.status(404).json({
        message: 'Room not found.'
      })
    }

    const updatedRoom = await db.room.update({
      where: { id: roomId },
      data: {
        roomStatusId: req.body.id
      },
    });

    return res.status(200).json({
      success: true,
      updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room type:", error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update room status'
    })
  }
};

const DELETE = async (req, res) => {
  return res.status(200).json({
    message: 'delete lawe'
  })
}
