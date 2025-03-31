"use client";

import { useCallback, useMemo, useState } from "react";
import { ORDER_BY, Product, UsePriceFilterProps } from "../@types";
import { handlePriceChange } from "../utils";

export default function useFilterByPriceAndSort({
  initialProducts,
}: UsePriceFilterProps) {
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");

  // @ts-expect-error - Just ignore
  const handleApplyFilter = (product) => {
    const minPrice = priceFrom ? Number.parseFloat(priceFrom) : 0;
    const maxPrice = priceTo
      ? Number.parseFloat(priceTo)
      : Number.POSITIVE_INFINITY;

    // Set a interval between prices and apply callback fn (aka filter) return boolean. True results are storared and rendered
    const isProductInThisPrice: boolean =
      product.productPrice >= minPrice && product.productPrice <= maxPrice;

    return isProductInThisPrice;
  };

  const filteredProductsByPrice = useMemo(() => {
    return initialProducts.filter(handleApplyFilter);
  }, [priceFrom, priceTo, initialProducts]);

  const handleSortProducts = useCallback(
    (products: Product[], option: string): Product[] => {
      const sorted = [...products].sort((a: Product, b: Product) => {
        const priceA = a.productPrice;
        const priceB = b.productPrice;

        switch (option) {
          case ORDER_BY.LOWEST:
            return priceA - priceB;
          case ORDER_BY.HIGHEST:
            return priceB - priceA;
          default:
            return a.productTitle.localeCompare(b.productTitle);
        }
      });
      return sorted;
    },
    [] 
  );

  return {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    handlePriceChange,
    filteredProductsByPrice,
    handleSortProducts,
  };
}
