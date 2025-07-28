import { useGetAllProductsQuery } from "@/lib/api/productApi";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesList({ categories }) {
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error.message}</p>;
  if (!data?.products || !Array.isArray(data.products)) return <p>Ma&#39;lumot yo&#39;q</p>;

  return (
    <div className="flex flex-wrap gap-4 px-2 pb-3 text-gray-700">
      {categories.map((cat) => {
        const catProducts = data.products
          .filter((p) => p.category === cat)
          .slice(0, 4);

        return (
          <DropdownMenu key={cat}>
            <DropdownMenuTrigger asChild>
              <button className="text-sm md:text-base font-medium hover:underline outline-none">
                {cat.slice(0, 1).toUpperCase() + cat.slice(1)}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-full sm:w-[420px] md:w-[550px] lg:w-[600px] flex flex-col md:flex-row gap-4 p-4"
            >
              <DropdownMenuLabel className="flex flex-col gap-2 text-sm md:text-base">
                <Link
                  href={`/categorys/${encodeURIComponent(cat)}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {cat.slice(0, 1).toUpperCase() + cat.slice(1)}
                </Link>

                {catProducts[0]?.thumbnail && (
                  <div className="relative w-full md:w-[250px] h-[180px]">
                    <Image
                      src={catProducts[0].thumbnail}
                      alt={`${cat} rasmi`}
                      fill
                      className="rounded object-cover"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>
                )}
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="hidden md:block" />

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
                {catProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded transition"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 64px, 72px"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium truncate max-w-[100px]">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}
