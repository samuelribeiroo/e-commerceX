import { Badge, Heart, Share2, ShoppingCart } from "lucide-react";
import { Product } from "../@types";
import {
  AsideProductImages,
  ProductPageContainer,
  ProductPageInfo,
} from "../components/ui/product-view-page-ui";
import { formatCurrencyBRL, generateRandomNumber } from "../utils";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <ProductPageContainer title={product.productTitle}>
      <ProductPageInfo>
        <AsideProductImages productImages={product.images} />
        <div className="w-full lg:w-2/5">
          {/* Marca e avaliações */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="font-bold text-lg">
              <h2 className="text-2xl font-semibold text-gray-700">
                {product.productBrand?.name.toUpperCase()}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    clipPath="url(#half-star)"
                  ></path>
                  <defs>
                    <clipPath id="half-star">
                      <rect x="0" y="0" width="10" height="20" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="text-gray-500">{generateRandomNumber(201)}</span>
              <div className="flex gap-2 ml-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Banner promocional */}
          <div className="my-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-4 text-white">
            <div className="text-center mb-2">
              <p className="text-lg font-bold">MEGA PROMOÇÃO DE TECNOLOGIA</p>
              <p>
                Aproveite as ofertas por tempo limitado em produtos
                selecionados!
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm">Desconto:</p>
                <p className="text-2xl font-bold">25%</p>
              </div>
              <div>
                <p className="text-sm">Restam:</p>
                <p className="text-2xl font-bold">36 un.</p>
              </div>
            </div>
          </div>

          {/* Preço */}
          <div className="mb-6">
            <p className="text-gray-500 line-through">
              {formatCurrencyBRL((product.productPrice * 1.2).toFixed(2))}
            </p>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-orange-500">
                {formatCurrencyBRL(product.productPrice.toFixed(2))}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              À vista no PIX com <span className="font-bold">10% OFF</span>
            </p>

            <div className="mt-2">
              <p className="text-gray-700">
                {formatCurrencyBRL(product.productPrice.toFixed(2))}
              </p>
              <p className="text-sm text-gray-600">
                Em até 10x de{" "}
                <span className="font-bold">
                  {formatCurrencyBRL((product.productPrice / 10).toFixed(2))}
                </span>{" "}
                sem juros no cartão
              </p>
              <p className="text-sm text-gray-600">
                Ou em 1x no cartão com{" "}
                <span className="font-bold">10% OFF</span>
              </p>
            </div>
          </div>

          {/* Botões de compra */}
          <div className="flex gap-2">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-sm">
              COMPRAR
            </button>
            <button className="bg-white border-orange-500 text-orange-500 hover:bg-orange-50 p-2">
              <ShoppingCart />
            </button>
          </div>
        </div>
      </ProductPageInfo>
    </ProductPageContainer>
  );
}
