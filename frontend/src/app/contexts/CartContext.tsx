"use client";

import {
  createContext,
  useContext,
  useReducer,
} from "react";
import {
  CartContextProps,
  CartProviderProps,
} from "../@types";
import cartReducer, { initialState } from "./cartReducer";

enum ERROR_CONTEXT_MESSAGES {
  INVALID_STATE = "Invalid Provided State",
  INVALID_USE = "useCart must be used within a CartProvider"
}

const CartContext = createContext<CartContextProps>({
  state: initialState,
  dispatch: () => null,
});

function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  if (!state) throw new Error(ERROR_CONTEXT_MESSAGES.INVALID_STATE);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(ERROR_CONTEXT_MESSAGES.INVALID_USE);
  }

  return context;
}

export { useCart, CartProvider };
