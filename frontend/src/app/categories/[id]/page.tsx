import { apiURL } from "@/app/data";
import { notFound } from "next/navigation";

interface Product {
  productTitle: string;
  productPrice: number;
  images: any;
}

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
      }))
    ); 

    return (
      <div className="p-4">
        {products.map(({ productTitle, productPrice, images }: Product) => {
          return (
            <>
            {/* not finished yet the jsx */}
              <h1>{productTitle}</h1>
              <p>{productPrice}</p>
              <img src={images[0].imageURL} alt="" />
            </>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    notFound();
  }
}
