import { getToken } from "next-auth/jwt";
import { Content } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {  

    const token = await getToken({ req: request });

    if (!token) {
        return  NextResponse.json({ error: "Not authenticated", status: 401 })
        
    }

    const response = await fetch(`${process.env.API}/cart`, {
        headers:{
            token:token.token,
            'content-type':'application/json',  
        }
        })
        const payload=await response.json()
        return NextResponse.json(payload)
      
}