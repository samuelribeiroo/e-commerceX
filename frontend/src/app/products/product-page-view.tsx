import { ShoppingCart } from "lucide-react";
import { Product } from "../@types";
import {
  BuyProductComponent,
  ProductGeneralRating,
  ProductImageGallery,
  ProductPageContainer,
  ProductPageInfo,
  ProductPriceConditions,
  PromotionalComponent,
} from "../components/ui/product-view-page-ui";
import { formatCurrencyBRL } from "../utils";
import TopSellingProducts from "../components/ui/top-selling";

export function ProductDetails({ product }: { product: Product }) {
  const productPriceTotal = formatCurrencyBRL(
    (product.productPrice * 1.2).toFixed(2)
  );
  const productPriceWithDiscount = formatCurrencyBRL(
    product.productPrice.toFixed(2)
  );

  const productPriceInstallment = formatCurrencyBRL(
    (product.productPrice / 10).toFixed(2)
  );

  return (
    <ProductPageContainer title={product.productTitle}>
      <ProductPageInfo>
        <ProductImageGallery productImages={product.images} />
        <div className="w-full lg:w-2/5">
          <div className="flex items-center justify-between border-b pb-4">
            <span className="font-bold text-lg">
              <h2 className="text-2xl font-semibold text-gray-700">
                {product.productBrand?.name.toUpperCase()}
              </h2>
            </span>

            <ProductGeneralRating />
          </div>

          <PromotionalComponent
            title={"MEGA PROMOÇÃO"}
            text={
              "Aproveite as ofertas por tempo limitado em produtos selecionados!"
            }
            discount={"20%"}
          />

          <ProductPriceConditions
            total={productPriceTotal}
            discount={productPriceWithDiscount}
            installment={productPriceInstallment}
          />

          <BuyProductComponent
            text={"Comprar"}
            icon={<ShoppingCart />}
            productId={""}
            product={{
              id: product.id,
              productTitle: product.productTitle,
              productPrice: product.productPrice,
              images: product?.images,
            }}
          />
        </div>
      </ProductPageInfo>
      <TopSellingProducts title={"RELACIONADOS"} />
    </ProductPageContainer>
  );
}
