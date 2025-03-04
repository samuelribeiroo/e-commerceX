"use client";

import { useMemo, useState } from "react";
import { UsePriceFilterProps } from "../@types";
import { handlePriceChange } from "../utils";

export default function useFilterByPrice({
  initialProducts,
}: UsePriceFilterProps) {
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");

  // @ts-ignore
  const handleApplyFilter = (product) => {
    const minPrice = priceFrom ? Number.parseFloat(priceFrom) : 0;
    const maxPrice = priceTo
      ? Number.parseFloat(priceTo)
      : Number.POSITIVE_INFINITY;


    // Set a interval between prices and apply callback fn (aka filter) return boolean. True results are storared and rendered
    const isProductInThisPrice =
      product.productPrice >= minPrice && product.productPrice <= maxPrice;

    return ( isProductInThisPrice );
  };

  const filteredProductsByPrice = useMemo(() => {
    return initialProducts.filter(handleApplyFilter);
  }, [priceFrom, priceTo, initialProducts]);

  return {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    handlePriceChange,
    filteredProductsByPrice,
  };
}
