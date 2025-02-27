"use client";

import { icons, NavigationContentProps } from "@/app/data";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";


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
      <div className="md:hidden sm:flex flex-1 max-w-xl relative px-4">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input type="search" placeholder="Search" className="w-full pl-10" />
      </div>
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
                    <span className="pop-up-added">{icon.added}</span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

type CategoriesNavigationProps = {
  categories: string[];
};

function CategoriesNavigation({ categories }: CategoriesNavigationProps) {
  return (
    <>
      <nav className="hidden lg:flex items-center justify-center py-5 font-outfit">
        <div className="flex items-center space-x-8 pl-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                <span>Todas cateorias</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ml-6 mt-4">
              {categories.map(( name ) => (
                <DropdownMenuItem key={name} asChild>
                  <Link
                    href={`/${name.toLowerCase()}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span>{name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-6">
            {categories.slice(0,6).map((name) => (
              <Link
                key={name}
                href={`/${name.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

type MobileMenuProps = {
  openMenu: (value: boolean) => void;
  isOpen: boolean;
  categories: string[];
};

function MobileMenu({ openMenu, categories }: MobileMenuProps) {
  
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <button className="flex items-center gap-2">
            <Menu className="size-6 ml-4 my-4" />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto">
            <nav className="flex flex-col p-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-500">Categorias</p>
                {categories.map((name) => (
                  <Link
                    key={name}
                    href={`/${name.toLowerCase()}`}
                    className="flex items-center gap-3 text-sm py-2 px-3 rounded-lg hover:bg-gray-100"
                    onClick={() => openMenu(false)}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export { DesktopNavigation, CategoriesNavigation, MobileMenu };
