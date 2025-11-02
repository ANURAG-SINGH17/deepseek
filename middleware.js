import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/signup", req.url));

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
}

export const config = {
  matcher: ["/"],
};
