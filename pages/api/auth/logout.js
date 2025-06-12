import { serialize } from "cookie";
import { successResponse, errorResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  const cookie = serialize("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);

  return successResponse({
    res,
  });
}
