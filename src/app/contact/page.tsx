import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";

const contactOptions = [
  {
    title: "Email",
    value: "abdelrahman.ibrahiem.elshiekh@gmail.com",
    href: "mailto:abdelrahman.ibrahiem.elshiekh@gmail.com",
    icon: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/abdelrahman-ibrahiem-elshiekh",
    href: "https://www.linkedin.com/in/abdelrahman-ibrahiem-elshiekh-aa01643b7",
    icon: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    title: "GitHub",
    value: "github.com/Abdelrahman-Elshiekh",
    href: "https://github.com/Abdelrahman-Elshiekh",
    icon: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.06),_transparent_35%),linear-gradient(135deg,_#09090b_0%,_#111827_100%)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur">
            <Send className="h-4 w-4 text-amber-400" />
            Contact Fresh Cart
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              We’d love to hear from you.
            </h1>
            <p className="text-lg leading-8 text-zinc-300">
              Whether you need support, want to share feedback, or have a question about your order, our team is here to help.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:abdelrahman.ibrahiem.elshiekh@gmail.com"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Send an email
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Get in touch</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Reach out through any of the options below and we’ll get back to you as soon as possible.
          </p>
          <div className="mt-8 space-y-4">
            {contactOptions.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/40 hover:bg-amber-400/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-amber-400/15 p-2 text-amber-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-zinc-400">{item.value}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
