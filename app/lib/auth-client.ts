import { createAuthClient } from "better-auth/react"

import { adminClient ,emailOTPClient, inferAdditionalFields} from "better-auth/client/plugins"



export const   authClient = (baseURL:string)=>{
   return createAuthClient({
            baseURL,
            plugins: [
                inferAdditionalFields({
                user: {
                  subRole: {
                    type: "string"
                  }
                }
            }),
                adminClient(),
                emailOTPClient()
            ]
        })

    
   }
 
