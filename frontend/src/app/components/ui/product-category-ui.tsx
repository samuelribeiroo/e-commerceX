import { PropsWithChildren } from "react";
import Image from "next/image";
import { ContentCardProps, ProductImage } from "@/app/@types";
import { Heart } from "lucide-react";
import { formatCurrencyBRL, normalizeString } from "@/app/utils";


function ProductsGrid({ children }: PropsWithChildren) {
  return (
    <>
      <section className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </section>
    </>
  );
}

function ProductCard({
  src,
  productTitle,
  productPrice,
  productDescription,
}: ProductImage) {
  return (
    <article className="border rounded-lg overflow-hidden h-[500px] d-flex-col px-4 md:px-0 my-4 xs:mx-4">
      <div className="relative h-60 w-full bg-gray-100">
        <Image
          src={src || "/placeholder.svg"}
          alt={productTitle}
          fill
          sizes="(max-width: 500px) 100vw, 400px"
          className="size-full object-cover object-center"
        />
      </div>

      <ProductCardContent
        title={productTitle}
        description={productDescription}
        price={productPrice}
      />
    </article>
  );
}

function ProductCardContent({ title, description, price }: ContentCardProps) {
  return (
    <>
      <header className="d-flex-col flex-grow">
        <h3 className="font-medium text-[1rem] text-gray-900 text-center mt-4 px-2">
          {title}
        </h3>
      </header>

      <div className="flex-grow overflow-y-auto px-4 mt-2">
        {normalizeString(String(description)).map((part, index) => (
          <p
            key={index}
            className="font-normal text-gray-600 text-left block mt-2"
          >
            {part.trim()}
          </p>
        ))}
      </div>

      <CardProductFooter>
        {formatCurrencyBRL(price.toFixed(2))}
      </CardProductFooter>
    </>
  );
}

function CardProductFooter({ children }: PropsWithChildren) {
  return (
    <>
      <footer className="p-4 d-flex-between mt-auto">
        <p className="text-lg font-medium tracking-wide">{children}</p>
        <button className="text-gray-400 hover:text-red-500">
          <Heart size={20} />
        </button>
      </footer>
    </>
  );
}

function AsideProductsFilters({ children }: PropsWithChildren) {
  return (
    <>
      <aside className="w-full md:w-64 border-r p-4 mr-8">
        <div className="mb-6">
          <div className="space-y-2">{children}</div>
        </div>
      </aside>
    </>
  );
}

function ProductViewSection({ children }: PropsWithChildren) {
  return (
    <>
      <section className="d-flex-col md:flex-row min-h-screen">
        {children}
      </section>
    </>
  );
}

export { ProductsGrid, ProductCard, AsideProductsFilters, ProductViewSection };
