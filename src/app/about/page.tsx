import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingBag, Sparkles, Truck } from "lucide-react";

const highlights = [
  {
    title: "Curated products",
    description: "We handpick everyday essentials and trending favorites for a smarter shopping experience.",
  },
  {
    title: "Fast delivery",
    description: "Enjoy quick, dependable delivery so your orders arrive when you need them.",
  },
  {
    title: "Trusted experience",
    description: "Secure checkout, simple support, and a seamless journey from browse to buy.",
  },
];

const values = [
  "Premium quality at everyday prices",
  "Easy navigation and helpful recommendations",
  "Friendly support whenever you need it",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.06),_transparent_35%),linear-gradient(135deg,_#09090b_0%,_#111827_100%)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-amber-400" />
            About Fresh Cart
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              We make everyday shopping simpler, faster, and more enjoyable.
            </h1>
            <p className="text-lg leading-8 text-zinc-300">
              Fresh Cart is built for people who want quality products, dependable delivery,
              and a modern online store that feels effortless from the first click.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Shop now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <ShoppingBag className="h-7 w-7 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Why customers love us</h2>
              <p className="text-sm text-zinc-400">A better experience for every order</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl shadow-black/20 backdrop-blur sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Our mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Designed to bring convenience and confidence to modern shopping.
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              We combine a clean storefront, curated product collections, and thoughtful customer support to make every purchase feel easy and rewarding.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white">
              <div className="rounded-full bg-amber-400/15 p-2 text-amber-400">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">What you can expect</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
