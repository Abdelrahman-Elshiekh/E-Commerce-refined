"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function DropdownMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn("relative", className)}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuTrigger must be used inside DropdownMenu");
  }

  return (
    <button
      type="button"
      onClick={() => context.setOpen((prev) => !prev)}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-200 outline-none",
        className
      )}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(DropdownMenuContext);

  if (!context || !context.open) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-45 rounded-lg border border-zinc-700 bg-zinc-900 p-2 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
