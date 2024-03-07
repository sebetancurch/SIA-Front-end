"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/services/user";
import { SignJWT, jwtVerify } from "jose";
import { Session } from "@/types/user";

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

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  // Verify credentials && get the user
  const user = { email, password };
  const expires = new Date(Date.now() + 10 * 1000);
  const response = await validateUser(user);

  if (response.user) {
    // Save the session in a cookie
    cookies().set("session", response.session, {
      // expires,
      httpOnly: true,
    });
    return response;
  }
  return response;
};

export const logout = async () => {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/login");
};

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = session;
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: parsed,
    httpOnly: true,
    // expires: new Date(Date.now() + 600 * 1000),
  });
  return res;
}

export const getSessionToken = async (): Promise<string | undefined> => {
  const cookiesStore = cookies();
  return cookiesStore.get("session")?.value;
};

export async function navigate(route: string) {
  redirect(route);
}
