import { anonymousClient } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
export const auth = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [anonymousClient(), nextCookies()]
})
