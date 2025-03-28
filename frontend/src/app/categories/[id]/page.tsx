import { apiURL, CACHE_TIME } from '@/app/data';
import { notFound } from 'next/navigation';
import { ProductCategoryView } from '../product-view';

export const dynamic = 'force-dynamic';

export default async function ProductsCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    
    const { id } = await Promise.resolve(params);
      
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      next: {
        revalidate: CACHE_TIME.EIGHT_HOURS
      }
    });
    
    if (!response.ok) notFound();
    
    const data = await response.json();

        // @ts-expect-error
        const products = await data.brands.flatMap((brand) =>
          // @ts-expect-error
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
    notFound();
  }
}