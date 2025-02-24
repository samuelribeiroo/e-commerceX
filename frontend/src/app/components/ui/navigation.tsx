"use client";

import { icons, NavigationContentProps } from "@/app/data";
import { Search } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Input } from "./input";

function DesktopNavigation() {
  return (
    <>
      <NavigationContainer>
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-3xl text-black font-bold">LOGO</h1>
        </Link>

        <div className="hidden sm:flex flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input type="search" placeholder="Search" className="w-full pl-10" />
        </div>

        <NavigationContent icons={icons} />
      </NavigationContainer>
    </>
  );
}

function NavigationContainer({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="container mx-auto h-20 px-4">
        <div className="d-flex-between gap-4 h-full">{children}</div>
      </nav>
    </>
  );
}

function NavigationContent({ icons }: NavigationContentProps) {
  return (
    <>
      <div className="flex items-center gap-4 sm:gap-8 font-inter">
        {icons.map((icon) => {
          const isProductAdded = icon.added !== undefined && icon.added > 0;

          return (
            <>
              <div key={icon.id} className="relative">
                {icon.id === 0 ? (
                  <Link
                    href={icon.link}
                    className="flex items-center gap-2 text-sm font-semibold text-darkBrown border-hover-zinc"
                  >
                    <span className="inline-flex items-center gap-3">
                      <icon.icon className="size-6" color="#323238" />
                      <h3 className="text-sm tracking-[0.5px] text-[#707784] font-semibold ">
                        Conta
                      </h3>
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={icon.link}
                    className="flex items-center gap-2 text-sm border-hover-zinc"
                  >
                    <icon.icon className="size-5" color="#323238" />
                    {isProductAdded && (
                      <span className="pop-up-added">
                        {icon.added}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export { DesktopNavigation };
