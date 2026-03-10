import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"
import { authClient } from "./lib/auth-client";
import { headers } from "next/headers";
export async function proxy(request: NextRequest) {
    const session = getSessionCookie(request)
    if (!session) {
        console.log("generating new anonymous session...")
        await authClient.signIn.anonymous({
            fetchOptions: {
                headers: await headers()
            }
        })
    }
    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}