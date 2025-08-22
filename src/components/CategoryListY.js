"use client";

import React from "react";
import Link from "next/link";

export default function CategoryListY({ categories }) {
  if (!Array.isArray(categories)) return null;

  return (
    <div className="bg-white p-2 w-full max-w-[450px] md:max-w-[250px] h-auto md:h-[300px] rounded shadow-md">
      <h2 className="font-bold text-lg mb-2">Kategoriyalar</h2>
      <div className="flex flex-col gap-1 max-h-[240px] overflow-y-auto">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${encodeURIComponent(cat.id)}`}
            className="hover:bg-gray-100 px-2 py-1 rounded w-full text-start block"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
