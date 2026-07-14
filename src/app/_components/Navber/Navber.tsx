"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navber = () => {
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

  return (
    <>
      <nav className="border-b  border-b-zinc-950 bg-zinc-950 sticky top-0 z-20 border-zinc-200 px-2 sm:px-4 py-2.5  dark:bg-zinc-800">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white scale-150  w-[19px] h-[19px] transition-transform duration-200 "
            >
              <path d="M4 6h16l1.5 14H2.5L4 6z" />
              <path d="M9 6c0-2.5 1.5-4 3-4s3 1.5 3 4" />
            </svg>

            <span className="self-center text-3xl text-heading font-semispace-nowrap text-white">
              Fresh Cart
            </span>
          </Link>
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
          <div
            className={`${isOpen ? "flex" : "hidden"} w-full md:block md:w-auto `}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
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
              {authpath.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`${isActive(item.href) ? "active-link" : ""} text-xl  block py-2 px-3 text-zinc-500 hover:text-zinc-400 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navber;
