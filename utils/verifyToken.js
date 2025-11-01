import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
   
  if (!token) return NextResponse.json({ message: "invalid token" }, { status: 401 })

  const secret = new TextEncoder().encode(process.env.JWT_KEY);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; 
  } catch {
    return null;
  }
}
