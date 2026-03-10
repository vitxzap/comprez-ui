
import { createAuthClient } from "better-auth/react"
import { anonymousClient } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"
export const authClient = createAuthClient({
    baseURL: "http://localhost:8080",
    basePath: "/v1/auth",
    plugins: [anonymousClient(), nextCookies()]
})