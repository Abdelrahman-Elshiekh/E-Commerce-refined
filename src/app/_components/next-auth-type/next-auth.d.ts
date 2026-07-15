import { UserResponse } from "@/app/login/login-api.interface";
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    user: UserResponse;
    token: string;
  }

  interface Session {
    user: UserResponse;
  }
}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    
  }
}