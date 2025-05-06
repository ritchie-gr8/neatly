import { NextResponse } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/images/upload",
  "/api/images/delete",
];

const isPublicPath = (path) => {
  return publicRoutes.some(
    (publicPath) => path === publicPath || path.startsWith("/api/public/")
  );
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    req.user = payload;
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
