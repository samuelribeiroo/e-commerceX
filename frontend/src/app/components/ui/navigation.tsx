"use client";

import { icons, images } from "@/app/data";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, PropsWithChildren } from "react";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropDownSearch,
} from "./dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import {
  MobileMenuProps,
  NavigationContentProps,
  NavigationGeneralProps,
  Product,
} from "@/app/@types";
import useSearchProducts from "@/app/hooks/useSearchProducts";
import { NotFound } from "../not-found";

function DesktopNavigation() {
  const { searchRef } = useSearchProducts();

  return (
    <>
      <NavigationContainer>
        <Link href="/" className="flex-shrink-0">
          <div className="inline-flex items-center gap-3">
            <img src={images[1].src} alt="" className="size-10" />
            <span className="inline-flex items-center font-inter text-3xl font-medium tracking-wider">
              Ecommerce<p className="text-[#CC0000]">X</p>
            </span>
          </div>
        </Link>

        <div
          className="hidden sm:flex flex-1 max-w-xl relative"
          ref={searchRef}
        >
          <FormSearchProducts />
        </div>

        <NavigationContent icons={icons} />
      </NavigationContainer>

      <nav
        className="md:hidden sm:flex flex-1 max-w-xl relative px-4 mt-8"
        ref={searchRef}
      >
        <FormSearchProducts />
      </nav>
    </>
  );
}

function FormSearchProducts() {
  const {
    searchResults,
    handleSearchProduct,
    searchTerm,
    setSearchTerm,
    searchRef,
  } = useSearchProducts();

  console.log("termo", searchTerm);
  console.log("resultado", searchResults);

  return (
    <>
      <form
        onSubmit={handleSearchProduct}
        className="w-full relative"
        autoComplete="false"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full pl-10"
          value={searchTerm}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
        />

        {searchResults.length > 0 ? (
          <DropDownSearch>
            {searchResults.map(({ id, productTitle, images }) => {
              return (
                <>
                  <span className="inline-flex items-center justify-start ml-5">
                    <img
                      src={images[0]?.imageURL || ""}
                      className="size-8 rounded-sm"
                    />
                    <Link
                      key={id}
                      href={`/products/${id}`}
                      className="block p-3 hover:bg-gray-100 transition-colors"
                    >
                      {productTitle}
                    </Link>
                  </span>
                </>
              );
            })}
          </DropDownSearch>
        ) : (
          searchTerm && (
            <DropDownSearch>
              <NotFound message="Nenhum produto encontrado."/>
            </DropDownSearch>
          )
        )}
      </form>
    </>
  );
}

function NavigationContainer({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="container mx-auto h-20 px-4">
        <div className="flex flex-col md:flex-row md:d-flex-between gap-4 h-full">
          {children}
        </div>
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

function CategoriesNavigation({ categories }: NavigationGeneralProps) {
  return (
    <nav className="hidden lg:flex items-center justify-center py-5 font-outfit">
      <div className="flex items-center space-x-8 pl-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2">
              <span>Todas categorias</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ml-20 mt-4 bg-white">
            {categories.map(({ id, name }) => (
              <DropdownMenuItem key={id} asChild>
                <Link
                  href={`/categories/${id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center space-x-6">
          {categories.slice(0, 6).map(({ id, name }) => (
            <Link
              key={id}
              href={`/categories/${id}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

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
                {categories.map(({ id, name }) => (
                  <Link
                    key={id}
                    href={`/categories/${id}`}
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
