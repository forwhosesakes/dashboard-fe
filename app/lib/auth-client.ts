import { createAuthClient } from "better-auth/react"

import { adminClient } from "better-auth/client/plugins"

export const   authClient = createAuthClient({
            baseURL: "https://dashboard-be.forwhosesakes.workers.dev", //"http://localhost:3000", // the base url of your auth serverm
            plugins: [
                adminClient()
            ]
        })

