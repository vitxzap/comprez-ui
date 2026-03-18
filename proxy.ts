import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"
export async function proxy(request: NextRequest) {
    const session = getSessionCookie(request)
    if (!session) {
        console.log("no session")
    }
    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}