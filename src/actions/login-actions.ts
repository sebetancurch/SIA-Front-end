"use server";

import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Session, User } from "@/types/user";
import { LoginResponse, Response } from "@/types/response";
import { Navigation } from "@/types/navigation";

// export async function encrypt(payload: any) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("10 sec from now")
//     .sign(key);
// }

// export async function decrypt(input: string): Promise<any> {
//   const { payload } = await jwtVerify(input, key, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("accessToken")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = session;
  const res = NextResponse.next();
  res.cookies.set({
    name: "accessToken",
    value: parsed,
    httpOnly: true,
  });
  return res;
}

export async function navigate(route: string) {
  redirect(route);
}
