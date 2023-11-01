"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          className="relative mr-1"
          src="/logo.png"
          alt="yautils Logo"
          width={25}
          height={25}
          priority
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/LHI"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/LHI")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          勞健保計算
        </Link>
        <Link
          href="/my-ip"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/my-ip" ? "text-foreground" : "text-foreground/60"
          )}
        >
          查詢IP
        </Link>
      </nav>
    </div>
  );
}
