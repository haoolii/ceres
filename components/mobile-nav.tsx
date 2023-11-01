"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
// import { Icons } from "@/components/icons"
// import { Button } from "@/registry/new-york/ui/button"
// import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
// import { Sheet, SheetContent, SheetTrigger } from "@/registry/new-york/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between w-full md:hidden">
        <div className="flex-1">
          <SheetTrigger asChild className="">
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <ViewVerticalIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center mb-6"
              onOpenChange={setOpen}
            >
              <Image
                className="relative mr-1"
                src="/logo.png"
                alt="yautils Logo"
                width={25}
                height={25}
                priority
              />
              <span className="font-bold">{siteConfig.name}</span>
            </MobileLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
              <div className="flex flex-col space-y-3">
                {docsConfig.mainNav?.map(
                  (item) =>
                    item.href && (
                      <MobileLink
                        key={item.href}
                        href={item.href}
                        onOpenChange={setOpen}
                      >
                        {item.title}
                      </MobileLink>
                    )
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            className="relative mr-1"
            src="/logo.png"
            alt="yautils Logo"
            width={25}
            height={25}
            priority
          />
        </div>
        <div className="flex-1"></div>
      </div>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
