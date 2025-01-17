import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    
    
    index("routes/home.tsx"), 
        route("forgot-password", "routes/auth/forget-password/forgot-password.tsx"),
        route("reset-password", "routes/auth/reset-password/reset-password.tsx"),
        route("signup", "routes/auth/sign-up.tsx"),
        route("login", "routes/auth/login.tsx"),
        route("dashboard","routes/dashboard/dashboard.tsx"),
         ...prefix("cp",[
            // index("routes/dashboard/index.tsx"),
            ...prefix("users",[
        route("client/:id?", "routes/cp/users/create-edit-client.tsx"),
        index("routes/cp/users/users.tsx"),

    

            

            ])
        ])


        // ...prefix("dashboard",[
        //     index("routes/dashboard/index.tsx")
        // ])


    



] satisfies RouteConfig;
