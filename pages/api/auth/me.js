import { db } from "@/lib/prisma";
import * as jose from "jose";
import { HTTP_STATUS } from "@/constants/http-status";
import { errorResponse, successResponse } from "@/lib/response-utils";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return errorResponse({
        res,
        message: "Unauthorized",
        status: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    const { payload } = await jose.jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    const userId = payload.id;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        username: true,
        role: true,
        country: true,
        profilePicture: true,
        profilePicturePublicId: true,
      },
    });

    if (!user) {
      return errorResponse({
        res,
        message: "Unauthorized - User not found",
        status: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    return successResponse({
      res,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Me error:", error.message);
    return errorResponse({
      res,
      message: "An error occurred during me",
    });
  }
}
