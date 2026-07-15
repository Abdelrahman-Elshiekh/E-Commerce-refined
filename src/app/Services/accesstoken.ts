import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function accesstoken(){
    
    const secret = process.env.AUTH_SECRET;

    if(!secret) {
        throw new Error("Missing AUTH_SECRET environment variable");
    }

    const authtoken=(await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
      token: authtoken,
      secret: secret,
    });
    return token?.token 

}