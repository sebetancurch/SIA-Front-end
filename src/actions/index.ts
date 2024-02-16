'use server'

import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validateUser } from '@/services/auth';


export const login = async ({ email, password }: { email: string, password: string }) => {

  // Verify credentials && get the user
  const user = { email, password };
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await validateUser(user)

  if (typeof session === "string") {
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    redirect('/')
  } else {
    return 'There was an error'
  }
}

export const logout = async () => {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/login");
}

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
    expires: new Date(Date.now() + 600 * 1000),
  });
  return res;
}