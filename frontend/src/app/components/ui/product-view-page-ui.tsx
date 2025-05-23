"use client";

import { CartItem,ProductImagePropsWithOrder, ProductPageProps } from "@/app/@types";
import { useCart } from "@/app/contexts/CartContext";
import {  generateRandomNumber } from "@/app/utils";
import { Heart,  Share2,  X } from "lucide-react";
import Image from "next/image";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { CART_ACTIONS } from "@/app/contexts/cartReducer";
import { NotFound } from "../not-found";
import {
  CheckoutCartSidebar as Checkout,
  HeaderSidebarCart,
  SideBarContent,
  TotalPrice,
  CartSidebarData as Container,
} from "./shopping-cart-ui";

import { cacheManagerFactory } from "@/app/utils/cache-manager";

function ProductPageContainer({ title, children }: ProductPageProps) {
  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">{title}</h1>
      {children}
    </section>
  );
}

function ProductPageInfo({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">{children}</div>
    </>
  );
}

function ProductImageGallery(props: {
  productImages: Array<{ imageURL: string }>;
}) {
  const [mainImage, setMainImage] = useState(props.productImages[0]);

  // @ts-expect-error - Just ignore
  const changeMainImage = (image) => setMainImage(image);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-3/5">
      {/* Miniaturas das imagens */}
      <ProductImagesMiniatures>
        {props.productImages.map((image) => (
          <div
            // @ts-expect-error - Just ignore
            key={image.id}
            className={`border-2 rounded cursor-pointer w-16 h-16 flex-shrink-0 overflow-hidden ${
              // @ts-expect-error - Just ignore
              mainImage.id === image.id ? "border-primary" : "border-gray-200"
            }`}
            onClick={() => changeMainImage(image)}
          >
            <img
              src={image.imageURL}
              alt={`Imagem do produto ${image.imageURL}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </ProductImagesMiniatures>

      <MainProductImage id={""} imageURL={mainImage.imageURL} image_order={0} />
    </div>
  );
}

function ProductImagesMiniatures({ children }: PropsWithChildren) {
  return (
    <>
      <aside className="flex lg:flex-col gap-2 mt-4 lg:mt-0">{children}</aside>
    </>
  );
}

function MainProductImage(image: ProductImagePropsWithOrder) {
  return (
    <>
      <div className="flex-1 border border-gray-200 rounded-lg p-4 flex items-center justify-center bg-white">
        <Image
          src={image.imageURL}
          alt={`Imagem principal do produto`}
          className="max-h-[400px] object-contain"
          width={400}
          height={900}
        />
      </div>
    </>
  );
}

function ProductGeneralRating() {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4].map((star) => (
            <Stars key={star} />
          ))}
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
    </>
  );
}

function Stars() {
  return (
    <>
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
    </>
  );
}

function BuyProductComponent(props: {
  text: string;
  icon: ReactNode;
  productId: string;
  product: {
    id: string;
    productTitle: string;
    productPrice: number;
    productDescription?: string;
    images?: Array<{ imageURL: string }>;
  };
}) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: CART_ACTIONS.ADD,
   // @ts-expect-error - Just ignore
      payload: {
        ...props.product,
        productTitle: props.product?.productTitle,
        quantity: 1,
      },
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={addToCart}
        className="flex-1 font-semibold tracking-wide bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-sm"
      >
        {props.text}
      </button>
      <button className="bg-white border-orange-500 text-orange-500 hover:bg-orange-50 p-2" onClick={addToCart}>
        {props.icon}
      </button>
    </div>
  );
}

function CartSidebar() {
  const { state, dispatch } = useCart();
  const total = state.products.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const CACHE_PREFIX = "cart";
  const cacheKey = cacheManagerFactory.generateKey(CACHE_PREFIX, {});

  useEffect(() => {
    const cachedProducts = cacheManagerFactory.get<CartItem[]>(cacheKey);
    if (cachedProducts) {
      dispatch({
        type: CART_ACTIONS.CACHE,
        payload: cachedProducts
      });
    }
  }, []);

  useEffect(() => {
    if (state.products.length > 0) {
      cacheManagerFactory.save(cacheKey, state.products);
    } else {
      cacheManagerFactory.remove(cacheKey);
    }
  }, [state.products]);


  const handleShowCart = () =>
    dispatch({
      type: CART_ACTIONS.SHOW_CART,
      payload: null,
    });


  return (
    <aside
      className={`z-40 fixed right-0 top-0 h-full  w-96 bg-white shadow-xl transition-transform ${
        state.isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <HeaderSidebarCart title={"SEU CARRINHO"}>
          <button
            onClick={handleShowCart}
            className="text-gray-500 hover:text-gray-700 text-2xl p-1 rounded-full hover:bg-gray-100"
          >
            <X className="size-6" />
          </button>
        </HeaderSidebarCart>

        <div className="space-y-4">
          {state.products.length === 0 ? (
            <>
              <NotFound message="Nenhum produto adicionado." />
            </>
          ) : (
            <>
              {state.products.map((item) => {
                const imageUrl = item.images?.[0]?.imageURL || "/placeholder.svg";

                return (
                  <>
                    <Container>
                      <span className="relative w-24 h-24 border rounded overflow-hidden flex-shrink-0">
                      <Image src={imageUrl} alt={item.productTitle} fill className="object-cover" />
                      </span>

                      <SideBarContent
                        title={item.productTitle}
                        subtotal={total}
                        quantity={item.quantity}
                        price={item.productPrice}
                        product={{
                          id: item.id,
                          productTitle: item.productTitle,
                          productPrice: item.productPrice,
                          productDescription: undefined,
                          images: item.images
                        }}
                      />
                    </Container>
                  </>
                );
              })}
              <TotalPrice subtotal={total} />
              <Checkout message={"COMPRAR"} />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function ProductPriceConditions(props: {
  total: string;
  discount: string;
  installment: string;
}) {
  return (
    <>
      <div className="mb-6">
        <p className="text-gray-500 line-through">{props.total}</p>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-orange-500">
            {props.discount}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          À vista no PIX com <span className="font-bold">10% OFF</span>
        </p>

        <div className="mt-2">
          <p className="text-gray-700">{props.discount}</p>
          <p className="text-sm text-gray-600">
            Em até 10x de <span className="font-bold">{props.installment}</span>{" "}
            sem juros no cartão
          </p>
          <p className="text-sm text-gray-600">
            Ou em 1x no cartão com <span className="font-bold">10% OFF</span>
          </p>
        </div>
      </div>
    </>
  );
}

function PromotionalComponent(props: {
  title: string;
  text: string;
  discount: string;
}) {
  return (
    <>
      <div className="my-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-4 text-white">
        <div className="text-center mb-2">
          <p className="text-lg font-bold">{props.title}</p>
          <p>{props.text}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm">Desconto:</p>
            <p className="text-2xl font-bold">{props.discount}</p>
          </div>
          <div>
            <p className="text-sm">Restam:</p>
            <p className="text-2xl font-bold">{`${generateRandomNumber(
              68
            )} un.`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export {
  ProductPageContainer,
  ProductPageInfo,
  ProductImageGallery,
  MainProductImage,
  ProductGeneralRating,
  BuyProductComponent,
  CartSidebar,
  ProductPriceConditions,
  PromotionalComponent,
};
