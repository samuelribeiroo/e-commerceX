// components/ProductCategoryView.tsx (Client Component)
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  AsideProductsFilters,
  ProductCard,
  ProductsGrid,
  ProductViewSection,
} from "@/app/components/ui/product-category-ui";
import { Brand, Product } from "../@types";
import useFilterProducts from "../hooks/useFilterProducts";

export function ProductCategoryView({
  initialBrands,
  initialProducts,
}: {
  initialBrands: Brand[];
  initialProducts: Product[];
}) {
 const {  selectedBrandIds, handleBrandToggle, filteredProducts } = useFilterProducts({ initialBrands, initialProducts })

  return (
    <ProductViewSection>
      <AsideProductsFilters>
        <h2 className="text-lg font-bold mb-4">Marcas</h2>
        <div className="space-y-2">
          {initialBrands.map((brand) => (
            <label key={brand.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedBrandIds.includes(brand.id)}
                onChange={() => handleBrandToggle(brand.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm capitalize">{brand.name}</span>
            </label>
          ))}
        </div>
      </AsideProductsFilters>
    
      <ProductsGrid>
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              Nenhum produto encontrado para essa categoria.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={`${product.id}-${product.brandId}`}
              productTitle={product.productTitle}
              productPrice={product.productPrice}
              productDescription={product.productDescription}
              src={product.images[0]?.imageURL}
              alt={product.productTitle}
              id={product.id}
              images={[]}
              brandId={product.brandId}
            />
          ))
        )}
      </ProductsGrid>
    </ProductViewSection>
  );
}
