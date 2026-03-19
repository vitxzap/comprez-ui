"use client"

import { authClient } from "../auth/auth-client"

//This function will check if the user has an session and if not, it will create an anonymous session for them
export async function createAnonymousSession(session: ReturnType<typeof authClient.useSession>) {
    try {
        console.log(session)
        if (!session.data) {
            await authClient.signIn.anonymous()
        }
    }
    catch (err) {
        throw err
    }
}