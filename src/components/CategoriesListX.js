"use client";

import React from "react";
import Link from "next/link";

export default function CategoryList({ categories }) {
  if (!categories?.length) return null;

  return (
    <div className="flex gap-6 px-2 py-3 border-b border-gray-300 overflow-x-auto">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`} // yoki slug bo'lsa `/category/${cat.slug}`
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
        </Link>
      ))}
    </div>
  );
}
