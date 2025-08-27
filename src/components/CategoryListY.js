"use client";

import React from "react";
import Link from "next/link";
import { useGetAllSubcategoriesQuery, useGetAllSubSubcategoriesQuery } from "@/lib/api/productApi";

export default function CategoryListY({ categories }) {
  const { data: subcategoriesData } = useGetAllSubcategoriesQuery();
  const { data: subsubcategoriesData } = useGetAllSubSubcategoriesQuery();

  if (!Array.isArray(categories)) return null;

  // Faberlik kategoriyasi id = 2
  const faberCategory = categories.find((cat) => cat.id === 2);
  if (!faberCategory) return null;

  // Faberlik subcategory larini olish
  const faberSubcategories = subcategoriesData?.filter(
    (sub) => sub.category_id === 2
  ) || [];

  const getSubSubcategories = (subId) =>
    subsubcategoriesData?.filter((subsub) => subsub.subcategory_id === subId) || [];

  return (
    <div className="bg-white p-2 w-full max-w-[450px] md:max-w-[250px] h-auto rounded shadow-md relative">
      <h2 className="font-bold text-lg mb-2">{faberCategory.name} </h2>
      <div className="flex flex-col gap-1">
        {faberSubcategories.map((sub) => (
          <div key={sub.id} className="group relative">
            <Link
              href={`/subcategory/${encodeURIComponent(sub.id)}`}
              className="hover:bg-gray-100 px-2 py-1 rounded w-full text-start block"
            >
              {sub.name}
            </Link>

            {/* Sub-Subcategory dropdown */}
            {getSubSubcategories(sub.id).length > 0 && (
              <div className="absolute left-full top-0 hidden group-hover:block bg-white shadow-md min-w-[200px] z-50">
                {getSubSubcategories(sub.id).map((subsub) => (
                  <Link
                    key={subsub.id}
                    href={`/subsubcategory/${encodeURIComponent(subsub.id)}`}
                    className="block px-2 py-1 hover:bg-gray-100 whitespace-nowrap"
                  >
                    {subsub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
