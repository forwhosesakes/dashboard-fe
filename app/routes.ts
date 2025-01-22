import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    
    
    index("routes/home.tsx"), 
        route("forgot-password", "routes/auth/forget-password/forgot-password.tsx"),
        route("reset-password", "routes/auth/reset-password/reset-password.tsx"),
        route("signup", "routes/auth/sign-up.tsx"),
        route("login", "routes/auth/login.tsx"),
        route("download/:file", "routes/download.tsx"),
         ...prefix("cp",[
            // index("routes/dashboard/index.tsx"),
            ...prefix("users",[
        ...prefix("org",[
        route("create-edit/:id?", "routes/cp/users/create-edit-client.tsx"),
        ...prefix("/:id",[
        index( "routes/cp/users/view-client.tsx"),
        route( "dashboard","routes/cp/users/dashboard/dashboard.tsx"),


        ])



        ]),
        // route("new-client", "routes/cp/users/create-edit-client.tsx"),
        index("routes/cp/users/users.tsx"),

    

            

            ]),
            ...prefix("members",[
                // route("",""),
                index("routes/cp/members/members.tsx")
            ])
        ])


        // ...prefix("dashboard",[
        //     index("routes/dashboard/index.tsx")
        // ])


    



] satisfies RouteConfig;
