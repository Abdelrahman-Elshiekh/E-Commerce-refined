
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFailureResponse, LoginSuccessResponse } from "./login/login-api.interface";


const authoptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload: LoginFailureResponse | LoginSuccessResponse = await res.json();

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        }else{
           throw new Error(payload.message);
        }
   
        
      },
    }),
  ],
  callbacks: {
     jwt:({ token, user })=>{
      if (user) {
        token.user = user.user;
        token.token = user.token;
      } 
      
      return token;
    },
    session:({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    }
  },
};

export default authoptions;
