import { getToken } from "next-auth/jwt";
import { NextRequest,NextResponse } from "next/server";

const protectedroutes = ["/cart", "/wishlist", "/profile"];
const authroutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
     const token = await getToken({req})  
    if(protectedroutes.includes(req.nextUrl.pathname) ){
        if(token){
            return NextResponse.next()
         }else{
        let redirecturl = new URL("/login", process.env.NEXT_URL);
            redirecturl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(redirecturl);
         }
    }

     if (authroutes.includes(req.nextUrl.pathname)) {
       if (!token) {
         return NextResponse.next();
       } else {
         const redirecturl = new URL("/", process.env.NEXT_URL);
         return NextResponse.redirect(redirecturl);
       }
     }


     return NextResponse.next();


}