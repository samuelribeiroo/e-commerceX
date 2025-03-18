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

export enum CART_REDUCER_ACTIONS {
  ADD = "ADD_CART",
  SHOW_CART = "TOGGLE_CART",
}

export default function cartReducer(
  state: CartContextProps["state"] = initialState,
  action: CartAction
): any {
  switch (action.type) {
    case CART_REDUCER_ACTIONS.ADD:
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

    case CART_REDUCER_ACTIONS.SHOW_CART:
      return { ...state, isCartOpen: !state.isCartOpen };

    default:
      return state;
  }
}
