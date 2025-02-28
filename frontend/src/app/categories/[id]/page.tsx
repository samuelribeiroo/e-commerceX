import { Product } from "@/app/@types";
import {
  ProductCard,
  ProductsGrid,
} from "@/app/components/ui/product-category-ui";
import { apiURL } from "@/app/data";
import { notFound } from "next/navigation";

export default async function ProductsCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const response = await fetch(`${apiURL}/categories/${params.id}`, {
      next: { revalidate: 60 }, // Opcional: Cache de 60 segundos
    });

    if (!response.ok) notFound();

    const data = await response.json();

    // @ts-expect-error
    const products = await data.brands.flatMap((item) =>
      // @ts-expect-error
      item.products.map((product) => ({
        ...product,
        id: item.id,
        title: item.name,
        description: item.productDescription
      }))
    );

    return (
      <div className="p-4">
        <ProductsGrid>
          {products.map(
            ({
              id,
              productTitle,
              productPrice,
              productDescription,
              images,
            }: Product) => {
              return (
                <>
                  <ProductCard
                    src={images[0].imageURL}
                    alt={productTitle}
                    productTitle={productTitle}
                    productPrice={productPrice}
                    productDescription={productDescription}
                    key={id}
                  />
                </>
              );
            }
          )}
        </ProductsGrid>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    notFound();
  }
}
