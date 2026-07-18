'use server'
import { accesstoken } from "../accesstoken";
export  async function updatecart({ productId, count }: { productId: string; count :number}) {
  const token = await accesstoken();
  if (!token) {
    throw new Error("unauthurized...");
  }

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
        count:count
    })
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}