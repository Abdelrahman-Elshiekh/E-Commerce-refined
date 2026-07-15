'use server'
import { accesstoken } from "../accesstoken";

export  async function addToCart(productId: string, ) {
    const token= await accesstoken()
    if(!token){
        throw new Error('unauthurized...')
            }

  const response = await fetch(`${process.env.API}/cart`, {
    cache: "no-store",
    method: "POST",
    headers: {
        token:token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
  


}