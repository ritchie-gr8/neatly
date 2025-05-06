import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
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
      return res.status(409).json({ error: "User with this email or username already exists" });
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

    return res.status(201).json({
      user: {
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
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ error: "An error occurred during signup" });
  }
}
