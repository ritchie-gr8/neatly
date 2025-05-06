import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";
import bcrypt from "bcryptjs";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      dateOfBirth,
      country,
      profilePicture,
      profilePicturePublicId,
    } = req.body;

    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return errorResponse({
        res,
        message: "User with this email or username already exists",
        status: HTTP_STATUS.CONFLICT,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        passwordHash: hashedPassword,
        phone,
        dateOfBirth,
        country,
        role: "USER",
        profilePicture,
        profilePicturePublicId,
      },
    });

    return successResponse({
      res,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
        role: user.role,
        profilePicture: user.profilePicture,
        profilePicturePublicId: user.profilePicturePublicId,
      },
      status: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return errorResponse({
      res,
      message: "An error occurred during signup",
    });
  }
}
