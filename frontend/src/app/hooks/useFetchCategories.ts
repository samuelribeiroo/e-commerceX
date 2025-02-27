"use client"

import { useEffect, useState } from "react";
import { apiURL } from "../data";

export default function useFetchCategories() {
  const [categoryName, setCategoryName] = useState<string[]>([]);
  
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(`${apiURL}/categories`);

        if(!response.ok) throw new Error(`Erro ao carregar categorias.`)

        const data = await response.json();

        // @ts-ignore
        const categoriesName = data.map(category => category.name);
        
        setCategoryName(categoriesName)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
      
    }

    loadCategories()
  }, []);

  return { categoryName }
}