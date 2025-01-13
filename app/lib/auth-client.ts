import { createAuthClient } from "better-auth/react"

import { adminClient ,emailOTPClient} from "better-auth/client/plugins"



export const   authClient = (baseURL:string)=>{
   return createAuthClient({
            baseURL,//"http://localhost:3000", // the base url of your auth serverm
            plugins: [
                adminClient(),
                emailOTPClient()
            ]
        })

    
   }

