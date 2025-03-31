"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../@types";
import { apiURL } from "../data";

export default function useSearchProducts() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  const handleSearchProduct = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!searchTerm.trim()) return setSearchResults([]);

    try {
      const response = await fetch(
        `${apiURL}/product/products?search=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();

      data = data.map((product: Product[]) => ({
        ...product,
         // @ts-expect-error - This variable exists in the codebase because the fetch API brings an array with all the images related to the product, but we only need the first one. So apply the spread and slice operator to the array of product images.
        images: product.images.slice(0, 1),
      })); //

      setSearchResults(data || []);
    } catch (error) {
      console.log(error)
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => handleSearchProduct(), 500); // 500ms = 0.5 seconds

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchTerm]);

  return {
    handleSearchProduct,
    searchResults,
    searchTerm,
    setSearchTerm,
    searchRef,
  };
}
