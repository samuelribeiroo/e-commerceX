"use client";

import useFetchCategories from "@/app/hooks/useFetchCategories";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import ProductsCarousel from "./products-carousel";


function AsideContent({ children }: PropsWithChildren) {
  return (
    <>
      <aside className="w-[280px] bg-white rounded-lg shadow-sm p-4">
        {children}
      </aside>
    </>
  );
}

export default function AsideCategories() {
  const { categories } = useFetchCategories();

  return (
    <>
        <div className="xs:flex-col flex gap-8 mt-1">
          <AsideContent>
            <nav>
              <ul className="space-y-2 divide-y xs:w-[300px]">
                {categories.map(({ id, name }) => {
                  return (
                    <>
                      <li>
                        <Link
                          key={id}
                          href={`/categories/${id}`}
                          className="d-flex-between p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <span>{name}</span>
                          <ArrowRightIcon className="size-4"/>
                        </Link>
                      </li>
                    </>
                  );
                })}
              </ul>
            </nav>
          </AsideContent>
          <ProductsCarousel />
        </div>
    </>
  );
}
