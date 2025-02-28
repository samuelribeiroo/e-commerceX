import { PropsWithChildren } from "react";
import Image from "next/image";
import { ProductImage } from "@/app/@types";
import { Heart } from "lucide-react";
import normalizeString from "@/app/utils/normalizeString";

function ProductsGrid({ children }: PropsWithChildren) {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </section>
    </>
  );
}

function ProductCard({ src, productTitle, productPrice, productDescription }: ProductImage) {
  
  return (
    <>
      <div className="border rounded-lg overflow-hidden"> {/* Largura fixa para o card */}
        <div className="relative h-60 bg-gray-100">
          <img 
            src={src} 
            alt={productTitle} 
            className="w-full h-full object-cover" /* Tamanho fixo e cobrindo o espaço */
          />
        </div>
        <span className="mx-auto">
          <h3 className="font-medium text-[1rem] text-gray-900 text-center mt-4">{productTitle}</h3>
            {normalizeString(String(productDescription)).map(
              (part, index) => (
                <p 
                  key={index} 
                  className="font-normal text-gray-600 text-left block mx-4 mt-6"
                >
                  {part.trim()}
                </p>
              )
            )}
        </span>
        <div className="p-4 flex justify-between items-center"> {/* Usando flexbox para alinhar os elementos */}
          <p className="text-lg font-medium tracking-wide">R$ {productPrice.toFixed(2)}</p>
          <button className="text-gray-400 hover:text-red-500">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export { ProductsGrid, ProductCard };
