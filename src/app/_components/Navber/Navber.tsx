"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/Navber/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Heart, LogOut, ShoppingCart, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const Navber = () => {

 const {
   data: cartdata,
   isLoading,
   isError,
 } = useQuery({
   queryKey: ["GET-Cart"],
   queryFn: async () => {
     const resp = await fetch("/api/cart");
     const payload = resp.json();
     return payload;
   },
 });

 const {
   data: wishlistdata,
   isLoading: wishlistlaoding,
   isError: wishlisterror,
 } = useQuery({
   queryKey: ["get-wishlist"],
   queryFn: async () => {
     const resp = await fetch("/api/wishlist");
     const payload = resp.json();
     return payload;
   },
 });

  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");
  const path = [
    { href: "/", name: "Home" },
    { href: "/brands", name: "brands" },
    { href: "/categories", name: "categories" },
  ];
  const authpath = [
    { href: "/login", name: "Login" },
    { href: "/register", name: "Register" },
  ];

  const { status, data: session } = useSession();


  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }


  return (
    <>
      <nav className="border-b border-b-zinc-950 bg-zinc-950 sticky top-0 z-20 border-zinc-200 px-5 py-2.5 dark:bg-zinc-800">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-white scale-150 w-4.75 h-4.75 transition-transform duration-200"
              >
                <path d="M4 6h16l1.5 14H2.5L4 6z" />
                <path d="M9 6c0-2.5 1.5-4 3-4s3 1.5 3 4" />
              </svg>

              <span className="self-center text-3xl text-heading font-semispace-nowrap text-white">
                Fresh Cart
              </span>
            </Link>

            <div
              className={`${isOpen ? "flex" : "hidden"} w-full md:flex md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col gap-2  md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:items-center md:gap-6 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                {path.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`${isActive(item.href) ? "active-link" : ""} text-xl block py-2 px-3 text-zinc-500 hover:text-zinc-400 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className={`${isOpen ? "flex" : "hidden"} w-full md:flex md:w-auto`}
          >
            <ul className="font-medium flex flex-col gap-2 py-2 px-1 md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:items-center md:gap-3 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              {status === "authenticated" ? (
                <>
                  <li className="flex items-center gap-2">
                    <Link
                      href="/cart"
                      className="relative p-2 text-zinc-200 hover:text-white"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {cartdata?.numOfCartItems > 0 ? (
                        <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-rose-500 px-1 text-[10px] text-white">
                          {cartdata?.numOfCartItems}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </Link>

                    <Link
                      href="/wishlist"
                      className="relative p-2 text-zinc-200 hover:text-white"
                    >
                      <Heart className="h-5 w-5" />
                      {wishlistdata?.count > 0 ? (
                        <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-amber-500 px-1 text-[10px] text-white">
                          {wishlistdata?.count}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white">
                        <UserCircle2 className="mr-2 h-4 w-4" />
                        <span className="font-medium">
                          {session?.user?.name || "Profile"}
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link
                            href="/profile"
                            className="flex w-full items-center gap-2"
                          >
                            <UserCircle2 className="h-4 w-4" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </>
              ) : (
                authpath.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`${isActive(item.href) ? "active-link" : ""} text-xl block py-2 px-3 text-zinc-500 hover:text-zinc-400 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="text-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navber;
