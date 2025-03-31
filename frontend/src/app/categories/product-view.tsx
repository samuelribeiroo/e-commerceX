"use client";

import { useMemo, useState } from "react";
import { ORDER_BY, Product, ProductCategoryViewProps } from "../@types";
import { NotFound } from "../components/not-found";
import {
  AsideProductsFilters as FilterByCategory,
  ProductCard,
  ProductsGrid,
  ProductViewSection,
} from "../components/ui/product-category-ui";
import { ProductFilterPrice as FilterByPrice } from "../components/ui/product-filter-price-ui";
import SortingOptions from "../components/ui/sort-ui";
import useFilterProducts from "../hooks/useFilterProducts";
import useFilterByPriceAndSort from "../hooks/useFilterByPrice";
import Link from "next/link";

export function ProductCategoryView({ initialBrands, initialProducts }: ProductCategoryViewProps) {
  const [sortOption, setSortOption] = useState<string>(ORDER_BY.NAME);

  const {
    selectedBrandIds,
    handleBrandToggle,
    filteredProducts: brandFilteredProducts,
  } = useFilterProducts({
    initialBrands,
    initialProducts,
  });

  const {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    filteredProductsByPrice,
    handleSortProducts,
  } = useFilterByPriceAndSort({ initialProducts: brandFilteredProducts });

  const sortedProducts = useMemo(
    () => handleSortProducts(filteredProductsByPrice, sortOption),
    [filteredProductsByPrice, sortOption, handleSortProducts]
  );

  return (
    <>
      <div className="mx-auto p-4 md:ml-[230px]">
        <SortingOptions activeSort={sortOption} onSortChange={setSortOption} />
      </div>
      <ProductViewSection>
        <FilterByCategory>
          <div className="mb-6">
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
          </div>

          <FilterByPrice
            initial={priceFrom}
            final={priceTo}
            setPriceInitial={setPriceFrom}
            setPriceFinal={setPriceTo}
          />
        </FilterByCategory>

        <ProductsGrid>
          {sortedProducts.length === 0 ? (
            <NotFound message="Nenhum Produto encontrado nessa categoria." />
          ) : (
            sortedProducts.map((product: Product) => {
              return (
                  <Link href={`/products/${product.id}`} key={product.id}>
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
                  </Link>
              );
            })
          )}
        </ProductsGrid>
      </ProductViewSection>
    </>
  );
}
