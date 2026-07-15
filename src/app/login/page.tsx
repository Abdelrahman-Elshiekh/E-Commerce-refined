"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

import { loginSchema } from "@/app/shcema/loginschema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

const perks = [
  "Track your orders in one place",
  "Enjoy saved payment methods",
  "Get personalized offers",
];

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      if (response?.ok) {
        toast.success("Successfully logged in!");
        window.location.href = response.url || "/";
      } else {
        toast.error("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(135deg,_#09090b_0%,_#111827_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Welcome back to Fresh Cart
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Sign in to continue shopping.
            </h1>
            <p className="text-lg text-zinc-300 sm:text-xl">
              Access your saved carts, orders, and curated recommendations in a
              few seconds.
            </p>
          </div>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="w-full max-w-md border-white/10 bg-zinc-950/80 text-white shadow-2xl shadow-black/30 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white">Login</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-zinc-200"
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="h-11 rounded-xl border-zinc-800 bg-zinc-900/80 pl-10 text-white placeholder:text-zinc-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-zinc-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-zinc-800 bg-zinc-900/80 pl-10 pr-10 text-white placeholder:text-zinc-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isLoading}
                className="h-11 w-full rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-white transition hover:text-zinc-300"
              >
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
