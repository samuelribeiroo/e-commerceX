import { apiURL } from "@/app/data";
import { notFound } from "next/navigation";
import { ProductDetails } from "../product-page-view";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { id } = await Promise.resolve(params);

    const response = await fetch(`${apiURL}/product/${id}`, {
      // next: {
      //   revalidate: CACHE_TIME.THREE_DAYS
      // }
    });

    if (!response.ok) notFound();

    const data = await response.json();

    console.log('vem marca aqui?', data)

    

    return <ProductDetails product={data} />;
  } catch (error) {
    notFound();
  }
}
