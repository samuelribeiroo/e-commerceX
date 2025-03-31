import { CACHE_TIME } from "@/app/data";
import { notFound } from "next/navigation";
import { ProductDetails } from "../product-page-view";
import { ParamsType } from "@/app/@types";


export default async function ProductPage(props: {  params: ParamsType }) {
  try {
    const { id } = await props.params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
      next: {
        revalidate: CACHE_TIME.THREE_DAYS
      }
    });

    if (!response.ok) notFound();

    const data = await response.json();
    
    return <ProductDetails product={data} />;
  } catch (error) {
    console.log(error)
    notFound();
  }
}
