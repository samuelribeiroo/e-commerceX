import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {  Product, ProductCategoryViewProps } from "../@types";

export default function useFilterProducts({ initialBrands, initialProducts }: ProductCategoryViewProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>(
    searchParams.getAll("brand")
  );


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("brand");

    selectedBrandIds.forEach((id) => params.append("brand", id));

    router.replace(`${pathname}?${params.toString()}`);

    const selectedProductsFromFilter = initialProducts.filter((product) =>
      selectedBrandIds.includes(product.brandId)
    );

  
    const newFilteredProducts: Product[] =
      selectedBrandIds.length === 0
        ? initialProducts
        : selectedProductsFromFilter

    setFilteredProducts(newFilteredProducts);
  }, [selectedBrandIds]);

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  return {
    initialBrands,
    selectedBrandIds,
    handleBrandToggle,
    filteredProducts,
  };
}
