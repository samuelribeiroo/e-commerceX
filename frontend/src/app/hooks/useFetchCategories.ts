"use client";

import { useEffect, useState } from "react";
import { apiURL, CACHE_TIME } from "../data";
import { Category } from "../@types";
import { CacheManager } from "../utils/cache-manager";

const CACHE_PREFIX = "categories";
const cache = new CacheManager(CACHE_TIME.EIGHT_HOURS);

export default function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const params = {};
      const cacheKey = cache.generateKey(CACHE_PREFIX, params);

      try {
        const cachedData = cache.get<Category[]>(cacheKey);

        if (cachedData) {
          setCategories(cachedData);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!response.ok) throw new Error(`Erro ao carregar categorias.`);

        const data: Category[] = await response.json();
        cache.save(cacheKey, data);
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    cache.cleanExpired(CACHE_PREFIX);
  }, []);

  return { categories };
}
