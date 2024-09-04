import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./actions/login-actions";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const excludedPaths = /^(\/_next|\/_axiom|\/_api|\/_public|.*\..*)/;
  if (!excludedPaths.test(url.pathname)) {
    if (
      !request.nextUrl.pathname.endsWith("/login") &&
      !request.nextUrl.pathname.includes("/activate-account") &&
      !request.nextUrl.pathname.includes("/open-course")
    ) {
      const cookiesStore = cookies();
      const accessToken = cookiesStore.get("session")?.value;
      if (accessToken) {
        return await updateSession(request);
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (request.nextUrl.pathname.endsWith("/login")) {
      const cookiesStore = cookies();
      const accessToken = cookiesStore.get("session")?.value;
      if (accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        return NextResponse.next();
      }
    }
  }
}
