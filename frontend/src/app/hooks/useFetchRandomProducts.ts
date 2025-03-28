"use client";

import { useState, useCallback, useEffect } from "react";
import { Product } from "../@types";
import { apiURL } from "../data";
import { cacheManagerFactory } from "../utils/cache-manager";


const CACHE_PREFIX = "random_products";

export default function useFetchRandomProducts() {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const fetchRandomProducts = useCallback(
    async (
      firstCategory: string,
      firstCount: number,
      secondCategory: string,
      secondCount: number
    ) => {
      const params = {
        firstCategory,
        firstCount,
        secondCategory,
        secondCount,
      };

      const cacheKey = cacheManagerFactory.generateKey(CACHE_PREFIX, params);

      const getRandomProductsByCategory = `${process.env.NEXT_PUBLIC_API_URL}/product/random?firstCategory=${encodeURIComponent(
        firstCategory
      )}&firstCount=${firstCount}&secondCategory=${encodeURIComponent(
        secondCategory
      )}&secondCount=${encodeURIComponent(secondCount)}`;

      // This variable implements the endpoint that's fetch random products based on a category.
      // To execute, it is necessary to pass the category name and the limit of products per category
      // Example: fetchRandomProducts("Notebooks", 3, "Cellphones", 2) -> fetch me 3 notebook products and 2 cellphone products

      try {
        const cachedData = cacheManagerFactory.get<Product[]>(cacheKey);

        if (cachedData) {
          setRandomProducts(cachedData);
          return;
        }

        const response = await fetch(getRandomProductsByCategory);

        if (!response.ok) throw new Error("Erro na requisição");

        const data: Product[] = await response.json();

        cacheManagerFactory.save(cacheKey, data);
        setRandomProducts(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    cacheManagerFactory.cleanExpired(CACHE_PREFIX);
  }, []);


  return {
    randomProducts,
    fetchRandomProducts,
  };
}
