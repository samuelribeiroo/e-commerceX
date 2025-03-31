"use client";

import { useCart } from "@/app/contexts/CartContext";
import { CART_ACTIONS } from "@/app/contexts/cartReducer";
import { formatCurrencyBRL } from "@/app/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PropsWithChildren } from "react";

type CartSideBarContainerProps = PropsWithChildren<{
  title: string;
}>;

function HeaderSidebarCart({ title, children }: CartSideBarContainerProps) {
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-medium">{title}</h2>
        {children}
      </header>
    </>
  );
}

function CheckoutCartSidebar(props: { message: string }) {
  return (
    <>
      <div className="p-4 mt-auto">
        <button className="w-full rounded-lg py-6 text-base bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-medium">
          {props.message}
        </button>
      </div>
    </>
  );
}

function SideBarContent(props: {
  title: string;
  subtotal: number;
  price: number;
  quantity?: number;
  product: {
    id: string;
    productTitle: string;
    productPrice: number;
    productDescription?: string;
    images?: Array<{ imageURL: string }>;
  }
}, ) {

  const { dispatch } = useCart();
  
  const handleAddProducts = () => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: {
        ...props.product,
        // @ts-expect-error - ignore
        title: props.product.productTitle,
        quantity: 1,
      },
    });
  };

  const handleRemoveProducts = () => {
    dispatch({
      type: CART_ACTIONS.REMOVE,
      payload: props.product.id
    })
  }

  const handleDecreaseProductAmount = () => {
    dispatch({
      type: CART_ACTIONS.DECREASE,
      payload: props.product.id
    })
  }
  
  return (
    <>
      <div className="flex-1">
        <h3 className="font-medium">{props.title}</h3>
        <div className="mt-2 flex justify-between items-center">
          <p className="font-semibold text-lg">
            {formatCurrencyBRL(props.price.toFixed(2))}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => handleDecreaseProductAmount()}
              className="w-8 h-8 flex items-center justify-center border rounded-full"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-3 w-6 text-center">{props.quantity}</span>
            <button
              onClick={() => handleAddProducts()}
              className="w-8 h-8 flex items-center justify-center border rounded-full"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => handleRemoveProducts()}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}

function TotalPrice(props: { subtotal: number }) {
  return (
    <>
      <span className="inline-flex items-center gap-2">
        <h3 className="text-[20px] mx-auto text-gray-700">TOTAL: </h3>

        <p className="text-[20px] mx-auto font-semibold text-black">
          {formatCurrencyBRL(props.subtotal.toFixed(2))}
        </p>
      </span>
    </>
  );
}

function CartSidebarData({ children }: PropsWithChildren) {
  return (
    <>
    <section className="flex-1 overflow-auto">
      <div className="p-4 border-b">
        <div className="flex gap-4">
          {children}
        </div>
      </div>
    </section>
    </>
  )
}

export { HeaderSidebarCart, CheckoutCartSidebar, SideBarContent, TotalPrice, CartSidebarData };
