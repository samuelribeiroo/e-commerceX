"use client";

import { handlePriceChange } from "@/app/utils";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export function ProductFilterPrice(props: {
  initial: string;
  final: string;
  setPriceInitial: Dispatch<SetStateAction<string>>;
  setPriceFinal: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <PriceFilterContainer>
        <span>
          <p className="text-sm text-gray-500 mb-1">Mínimo</p>
          <input
            type="text"
            value={props.initial}
            onChange={(event) =>
              handlePriceChange(event, props.setPriceInitial)
            }
            placeholder="Preço Min."
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </span>

        <span>
          <p className="text-sm text-gray-500 mb-1">Máximo</p>
          <input
            type="text"
            value={props.final}
            onChange={(event) => handlePriceChange(event, props.setPriceFinal)}
            placeholder="Preço Max."
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </span>
      </PriceFilterContainer>
    </>
  );
}

function PriceFilterContainer({ children }: PropsWithChildren) {
  return (
    <>
      <section className="mb-6">
        <h3 className="text-gray-600 mb-2">Preço</h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </section>
    </>
  );
}
