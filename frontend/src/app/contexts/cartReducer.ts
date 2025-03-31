import type {
  CartContextProps,
  CartState,
  CartAction,
  Product,
  CartItem,
} from "../@types";

export const initialState: CartState = {
  products: [],
};


export enum CART_ACTIONS {
  ADD = "ADD",
  SHOW_CART = "SHOW_CART",
  REMOVE = "REMOVE",
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  CACHE = "CACHE",
}

export default function cartReducer(
  state: CartContextProps["state"] = initialState,
  action: CartAction
): any {
  switch (action.type) {
    case CART_ACTIONS.ADD:
      const isAlreadyAddedToCart = state.products.find(
        (product: Product) => product.id === action.payload.id
      );

      if (isAlreadyAddedToCart) {
        return {
          ...state,
          products: state.products.map((product: CartItem) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
          isCartOpen: true,
        };
      }

      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
        isCartOpen: true,
      };

    case CART_ACTIONS.SHOW_CART:
      return { ...state, isCartOpen: !state.isCartOpen };

    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        products: state.products.filter(
          (product: CartItem) => product.id !== String(action.payload)
        ),
      };

    case CART_ACTIONS.DECREASE:
      return {
        ...state,
        products: state.products
          .map((product: CartItem) =>
            product.id === String(action.payload)
              ? { ...product, quantity: Math.max(0, product.quantity - 1) }
              : product
          )
          .filter((product) => product.quantity > 0),
      };

    case CART_ACTIONS.CACHE:
      return {
        ...state,
        products: action.payload,
        isCartOpen: false, 
      };

    default:
      return state;
  }
}
