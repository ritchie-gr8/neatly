import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import * as jose from "jose";
import { HTTP_STATUS } from "@/constants/http-status";
import { errorResponse, successResponse } from "@/lib/response-utils";

const JWT_SECRET_RAW = process.env.JWT_SECRET;
if (!JWT_SECRET_RAW) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return errorResponse({
        res,
        message: "Identifier and password are required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const user = await db.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return errorResponse({
        res,
        message: "Invalid credentials",
        status: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    const token = await new jose.SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const cookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    return successResponse({
      res,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return errorResponse({
      res,
      message: "An error occurred during login",
    });
  }
}
