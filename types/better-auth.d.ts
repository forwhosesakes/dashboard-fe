import "better-auth"
declare module "better-auth"{
    interface User {
        subRole: "admin" | "org" | "dataEntry";
      }
    
      interface UserWithRole extends User {
        role: "admin" | "user";
        subRole: "admin" | "org" | "dataEntry";
      }
}