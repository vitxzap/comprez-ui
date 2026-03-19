"use client"
import { authClient } from "../auth/auth-client"

//This function will check if the user has an session and if not, it will create an anonymous session for them
export async function createAnonymousSession(prevSession: ReturnType<typeof authClient.useSession>) {
    try {
        if (!prevSession.data) {
            await authClient.signIn.anonymous()
        }
    }
    catch (err) {
        throw err
    }
}