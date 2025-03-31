"use client";

import { productCategories } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function ProductCategoryCards() {

  return (
    <>
      <ProductCategoryContent>
        {productCategories.map(({ id, title, discount, link, src }) => (
          <Link href={link} key={id}>
            <div
              className="cursor-pointer relative overflow-hidden rounded-lg h-[180px] border-2 border-gray-200"
              style={{ backgroundColor: "white" }}
              key={id}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <header className="space-y-1">
                  <h3 className="text-gray-900 text-md font-medium">
                    {title}
                  </h3>
                </header>

                <span className="absolute right-0 bottom-0 h-full w-2/3 d-flex-between pr-4">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={title}
                    width={600}
                    height={400}
                    className="object-scale-down transform translate-x-4 translate-y-4 mb-8"
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </ProductCategoryContent>
    </>
  );
}

function ProductCategoryContent({ children }: PropsWithChildren) {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-1 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">{children}</div>
      </section>
    </>
  );
}
