import {  CACHE_TIME } from '@/app/data';
import { notFound } from 'next/navigation';
import { ProductCategoryView } from '../product-view';

export const dynamic = 'force-dynamic';

type ParamsType = Promise<{ id: string }>

export default async function ProductsCategoryPage(props: {  params: ParamsType }) {
  try {
    
    const { id } = await props.params;
      
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      next: {
        revalidate: CACHE_TIME.EIGHT_HOURS
      }
    });
    
    if (!response.ok) notFound();
    
       const data = await response.json();

        // @ts-expect-error - Just ignore
        const products = await data.brands.flatMap((brand) =>
          // @ts-expect-error - Just ignore
          brand.products.map((product) => ({
            ...product,
            brandId: brand.id,
            brandName: brand.name
          }))
        );
    
    return (
      <ProductCategoryView 
        initialBrands={data.brands}
        initialProducts={products}
      />
    );
  } catch (error) {
    console.log(error)
    notFound();
  }
}