import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./actions/login-actions";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const excludedPaths = /^(\/_next|\/_axiom|\/_api|\/_public|.*\..*)/;
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(accessToken);
  if (!excludedPaths.test(url.pathname)) {
    if (
      !request.nextUrl.pathname.endsWith("/login") &&
      !request.nextUrl.pathname.includes("/activate-account") &&
      !request.nextUrl.pathname.includes("/open-course")
    ) {
      if (accessToken) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (request.nextUrl.pathname.endsWith("/login")) {
      if (accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        return NextResponse.next();
      }
    }
  }
}
