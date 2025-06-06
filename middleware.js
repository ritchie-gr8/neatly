import { NextResponse } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

const publicRoutes = [
  // pages
  "/",
  "/sign-in",
  "/sign-up",
  "/search-result",

  // api
  "/api/auth/login",
  "/api/auth/signup",
  "/api/images/upload",
  "/api/images/delete",
  "/api/rooms/search-rooms",
  "/api/rooms/get-rooms",
  "/api/room-type",
  "/api/intents",
  "/api/max-guest",
  "/api/chatbot/response/message",
  "/api/chat",
  "/api/chatbot",
  "/api/hotel-info",
];

const protectedRoutes = ["/admin", "/api/admin"];

const isPublicPath = (path) => {
  return publicRoutes.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath)
  );
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;

  if ((pathname === "/sign-in" || pathname === "/sign-up") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    req.user = payload;
    const role = payload.role;

    if (
      protectedRoutes.some((protectedPath) =>
        pathname.startsWith(protectedPath)
      ) &&
      role.toLowerCase() !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
