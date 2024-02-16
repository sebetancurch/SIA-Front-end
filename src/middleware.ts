import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from './actions';
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const cookiesStore = cookies()
    const accessToken = cookiesStore.get('session')?.value
    if (accessToken) {
        return await updateSession(request);
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!login|api|_next/static|_next/image|favicon.ico).*)'],
}