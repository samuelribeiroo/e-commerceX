"use client";

import { SortTypeProps } from "@/app/@types";
import { sortOptions } from "@/app/data";
import { SlidersHorizontal } from "lucide-react";

export default function SortingOptions({
  activeSort,
  onSortChange,
}: SortTypeProps) {

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto py-2 w-full">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="text-sm font-medium">Ordenas por:</span>
        </div>

        <span className="flex items-center gap-2">
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`rounded-full px-4 py-1 h-8 text-sm font-medium ${
                activeSort === option
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => onSortChange(option)}
            >
              {option}
            </button>
          ))}
        </span>
      </div>
    </>
  );
}
