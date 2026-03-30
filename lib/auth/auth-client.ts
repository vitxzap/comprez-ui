import { anonymousClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    basePath: "/v1/auth",
    plugins: [anonymousClient()],
    fetchOptions: {
        credentials: 'include'
    }
})