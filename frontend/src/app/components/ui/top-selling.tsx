"use client";

import { Product } from "@/app/@types";
import useFetchRandomProducts from "@/app/hooks/useFetchRandomProducts";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useEffect } from "react";
import { ProductCard } from "./product-category-ui";

function ProductTopSellingsCard({
  id,
  productTitle,
  productDescription,
  productPrice,
  images,
}: Product) {
  return (
    <>
      <ProductCard
        id={id}
        productTitle={productTitle}
        productPrice={productPrice}
        productDescription={productDescription}
        images={[]}
        brandId={""}
        src={images[0]?.imageURL}
        alt={productTitle}
      />
    </>
  );
}

export default function TopSellingProducts() {
  const { randomProducts, fetchRandomProducts } = useFetchRandomProducts();

  useEffect(() => {
    fetchRandomProducts("Nootebooks", 3, "Celulares", 2);
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-gray-800">
            Mais Vendidos
          </h2>
          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
          >
            ver todos <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <TopSellingGrid>
          {randomProducts.map((product, index) => (
            <ProductTopSellingsCard key={index} {...product} />
          ))}
        </TopSellingGrid>
      </section>
    </>
  );
}

function TopSellingGrid({ children }: PropsWithChildren) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {children}
      </div>
    </>
  );
}
