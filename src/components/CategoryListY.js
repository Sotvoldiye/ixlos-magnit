"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function CategoryListY({ categories }) {
  // categories array ekanligini tekshirish
  if (!Array.isArray(categories)) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none text-sm text-gray-700">
        Hamma Kategoriyalar
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Kategoriyalar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((cat) => (
          <DropdownMenuItem key={cat.id}>
            <Link href={`/categorys/${encodeURIComponent(cat.id)}`}>
              {cat.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
