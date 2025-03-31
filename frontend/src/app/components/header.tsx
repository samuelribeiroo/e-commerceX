"use client";

import { useState } from "react";
import {
  CategoriesNavigation,
  DesktopNavigation,
  MobileMenu,
} from "./ui/navigation";
import useFetchCategories from "../hooks/useFetchCategories";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useFetchCategories();

  return (
    <>
      <header className="w-full border-b">
        <DesktopNavigation />
        <CategoriesNavigation categories={categories} />
        <MobileMenu
          openMenu={setIsOpen}
          isOpen={isOpen}
          categories={categories}
        />
      </header>
    </>
  );
}
