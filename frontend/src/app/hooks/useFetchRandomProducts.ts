"use client";

import { useState, useCallback } from "react";
import { Product } from "../@types";
import { apiURL } from "../data";

export default function useFetchRandomProducts() {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const fetchRandomProducts = useCallback(
    async (
      firstCategory: string,
      firstCount: number,
      secondCategory: string,
      secondCount: number
    ) => {
      try {
        const response = await fetch(
          `${apiURL}/product/random?firstCategory=${encodeURIComponent(firstCategory)}&firstCount=${firstCount}&secondCategory=${encodeURIComponent(secondCategory)}&secondCount=${encodeURIComponent(secondCount)}`
        ); 

        if (!response.ok) throw new Error("Erro na requisição");

        const data = await response.json();

        setRandomProducts(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return {
    randomProducts,
    fetchRandomProducts,
  };
}
