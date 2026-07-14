"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { registerSchema } from "@/app/shcema/registerschema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const perks = [
  "Fast checkout and saved addresses",
  "Exclusive deals and early access",
  "Secure order tracking",
];

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        // Safe validation fallback if error messaging varies from API
        toast.error(result.message || result.errors?.msg || "Signup failed");
        return;
      }

      // Success messages grouped cleanly together
      toast.success(`Welcome aboard, ${data.name}! Your account is ready.`);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      toast.error(
        "Something went wrong. Please check your network connection.",
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(135deg,_#09090b_0%,_#111827_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Join the Fresh Cart community
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Create your account and shop smarter.
            </h1>
            <p className="text-lg text-zinc-300 sm:text-xl">
              Sign up to unlock limited offers, save your favorites, and enjoy a
              faster checkout every time.
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
            <CardTitle className="text-2xl text-white">Register</CardTitle>
            <CardDescription className="text-zinc-400">
              Fill in your details to get started with Fresh Cart.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-zinc-200"
                  htmlFor="name"
                >
                  Full name
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="h-11 rounded-xl border-zinc-800 bg-zinc-900/80 pl-10 text-white placeholder:text-zinc-500"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

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
                  htmlFor="phone"
                >
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="01012345678"
                    className="h-11 rounded-xl border-zinc-800 bg-zinc-900/80 pl-10 text-white placeholder:text-zinc-500"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-400">{errors.phone.message}</p>
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
                    type="password"
                    {...register("password")}
                    placeholder="Create a strong password"
                    className="h-11 rounded-xl border-zinc-800 bg-zinc-900/80 pl-10 text-white placeholder:text-zinc-500"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-zinc-200"
                  htmlFor="rePassword"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="rePassword"
                    type="password"
                    {...register("rePassword")}
                    placeholder="Re-enter your password"
                    className="h-11 rounded-xl border-zinc-800 bg-zinc-900/80 pl-10 text-white placeholder:text-zinc-500"
                  />
                </div>
                {errors.rePassword && (
                  <p className="text-sm text-red-400">
                    {errors.rePassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white transition hover:text-zinc-300"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
