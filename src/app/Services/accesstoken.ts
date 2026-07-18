import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function accesstoken() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET environment variable");

  const cookieStore = await cookies();
  const authtoken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!authtoken) return undefined;

  const token = await decode({ token: authtoken, secret });
  return token?.token;
}
