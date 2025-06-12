import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    // Verify authentication
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

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return errorResponse({
        res,
        message: "User not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // Get update data from request body
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      country,
      profilePicture,
      profilePicturePublicId,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dateOfBirth || !country) {
      return errorResponse({
        res,
        message: "Required fields are missing",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    // Check if email is already taken by another user
    if (email !== existingUser.email) {
      const emailExists = await db.user.findFirst({
        where: {
          email,
          NOT: {
            id: userId,
          },
        },
      });

      if (emailExists) {
        return errorResponse({
          res,
          message: "Email is already in use",
          status: HTTP_STATUS.CONFLICT,
        });
      }
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        country,
        profilePicture,
        profilePicturePublicId,
      },
    });

    return successResponse({
      res,
      data: {
        user: {
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          username: updatedUser.username,
          email: updatedUser.email,
          phone: updatedUser.phone,
          dateOfBirth: updatedUser.dateOfBirth,
          country: updatedUser.country,
          role: updatedUser.role,
          profilePicture: updatedUser.profilePicture,
          profilePicturePublicId: updatedUser.profilePicturePublicId,
        },
      },
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    console.error("Profile update error:", error.message);
    return errorResponse({
      res,
      message: "An error occurred while updating profile",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
