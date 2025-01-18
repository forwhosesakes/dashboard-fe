declare global {
    
    interface User {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image: any;
      createdAt: Date;
      updatedAt: Date;
      role: string;
      banned: any;
      banExpires: any;
    }
  
  }
  
  export {};