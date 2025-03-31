"use client";



import { Product, SellingPropsType } from "@/app/@types";
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

interface Props {
  title?: string; 
}

export default function TopSellingProducts({ title = "Mais Vendidos" }: Props) {
  const { randomProducts, fetchRandomProducts } = useFetchRandomProducts();

  useEffect(() => {
    fetchRandomProducts("Smart Watch", 2, "Smartphone", 3);
  }, [fetchRandomProducts]);

  return (
    <TopSellingContainer text={title}>
      <TopSellingGrid>
        {randomProducts.map((product) => (
          <Link 
            href={`/products/${product.id}`} 
            key={`${product.id}-${product.brandId}`}
          >
            <ProductTopSellingsCard {...product} />
          </Link>
        ))}
      </TopSellingGrid>
    </TopSellingContainer>
  );
}

function TopSellingContainer({ text, children }: SellingPropsType) {
  return (
    <>
      <section className="w-full py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <span className="d-flex-between">
            <h2 className="text-xl md:text-2xl font-medium text-gray-800">
              {text}
            </h2>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
            >
              ver todos <ChevronRight className="size-4 ml-1" />
            </Link>
          </span>
          {children}
        </div>
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

export { TopSellingContainer, TopSellingGrid, ProductTopSellingsCard };
