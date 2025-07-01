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
  return (
    <div className="flex flex-wrap gap-4 px-2 pb-3 text-gray-500">
      {categories.map((cat) => {
        const catProducts = data.products
          .filter((p) => p.category === cat)
          .slice(0,4 );
        const categoryImage = catProducts.image;

        return (
          <DropdownMenu key={cat}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-start gap-2 p-0 cursor-pointer text-sm font-medium hover:underline outline-none">
              {cat.slice(0, 1).toUpperCase() + cat.slice(1)}
            </button>
          </DropdownMenuTrigger>
        
          <DropdownMenuContent className="w-auto flex items-center">
            <DropdownMenuLabel className="text-center font-semibold text-sm flex flex-col items-start">
              <Link
                href={`/categorys/${encodeURIComponent(cat)}`}
                className="hover:underline mb-2 text-blue-600"
              >
                {cat.slice(0, 1).toUpperCase() + cat.slice(1)}
              </Link>
        
              <img
                src={catProducts[0]?.thumbnail}
                alt={"rasm"}
                className="w-[250px] h-[200px] rounded-full object-cover"
              />
            </DropdownMenuLabel>
        
            <DropdownMenuSeparator />
            <div className="grid grid-cols-2 gap-3 p-2">
              {catProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex flex-col items-start gap-2 hover:bg-gray-100 p-1 rounded"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="text-xs truncate">  {product.title.split(" ").slice(0, 2).join(" ")}
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
