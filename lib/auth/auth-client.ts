import { anonymousClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:8080",
    basePath: "/v1/auth",
    plugins: [anonymousClient()],
    fetchOptions: {
        credentials: 'include'
    }
})