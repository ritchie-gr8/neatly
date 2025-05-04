import { db } from "@/lib/prisma";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
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
        username: true,
        role: true,
        country: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Me error:", error);
    return res.status(500).json({ error: "An error occurred during me" });
  }
}
