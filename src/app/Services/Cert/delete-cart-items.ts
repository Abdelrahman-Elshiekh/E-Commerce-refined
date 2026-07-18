'use server'
import { accesstoken } from "../accesstoken";

export  async function Deleteitem(productId: string, ) {
    const token= await accesstoken()
    if(!token){
        throw new Error('unauthurized...')
            }

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
  


}