"use client";

import { PropsWithChildren } from "react";
import { ApplicationLogo, FormSearchProducts } from "./navigation";
import { Search } from "lucide-react";
import Link from "next/link";
import useFetchCategories from "@/app/hooks/useFetchCategories";
import { contact, services } from "@/app/data";

export default function EcommerceFooter() {
  return (
    <>
      <FooterSection>
        <div className="flex-col gap-4 md: flex items-center justify-between py-4">
          <ApplicationLogo />
          <InputFooter />
        </div>

        <span className="border-t border-gray-200 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Entre em contato</h3>
            <span className="space-y-2 text-sm text-gray-600">
              {contact.map((item, id) => (
                <p className="font-medium" key={id}>{item.text}</p>
              ))}
            </span>
          </div>
          

          <CategoriesList />
          <CustomerServiceComponent />
          <NewsletterComponent />
        </div>

        <FooterSection />
      </FooterSection>
    </>
  );
}

function FooterSection({ children }: PropsWithChildren) {
  return (
    <>
      <footer className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 border-t">
        {children}
      </footer>
    </>
  );
}

function InputFooter() {
  return (
    <>
      <div className="flex items-center">
        <div className="relative w-full max-w-xl ml-4">
          <span className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <FormSearchProducts />
          </span>
        </div>
      </div>
    </>
  );
}

function NewsletterComponent() {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-4">
          Se Inscreva na nossa Newsletter
        </h3>
        <span className="flex flex-col space-y-2">
          <input
            type="email"
            placeholder="seumelhoremail@mail.com"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
            Inscreva-se
          </button>
        </span>
      </div>
    </>
  );
}

function CustomerServiceComponent() {

  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-4">Serviços ao Consumidor</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {services.map((item, id) => (
          <li key={id}>
            <Link href="#" className="hover:text-blue-600">
             {item.title}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function CategoriesList() {
  const { categories } = useFetchCategories();

  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-4">Categorias</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {categories.map(({ id, name }) => {
            return (
                <li key={id}>
                  <Link
                    href={`/categories/${id}`}
                    className="hover:text-blue-600"
                    key={id}
                  >
                    {name}
                  </Link>
                </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
