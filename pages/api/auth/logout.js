import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookie = serialize("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({ success: true });
}
