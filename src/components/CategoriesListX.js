"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  useGetAllSubcategoriesQuery,
  useGetAllSubSubcategoriesQuery,
} from "@/lib/api/productApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryList({ categories }) {
  const { data: subcategoriesData } = useGetAllSubcategoriesQuery();
  const { data: subsubcategoriesData } = useGetAllSubSubcategoriesQuery();
  const scrollRef = useRef(null);

  if (!Array.isArray(categories)) return null;

  const mainCategory = categories.find((cat) => cat.id === 1);
  if (!mainCategory) return null;

  const mainSubcategories =
    subcategoriesData?.filter((sub) => sub.category_id === 1) || [];

  const getSubSubcategories = (subId) =>
    subsubcategoriesData?.filter((subsub) => subsub.subcategory_id === subId) || [];

  const capitalize = (text) =>
    text.replace(/\b\w/g, (char) => char.toUpperCase());

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Scroll qilinadigan list */}
      <div
        ref={scrollRef}
        className="flex gap-3 px-10 py-3 overflow-x-hidden overflow-y-hidden whitespace-nowrap w-full border-b"
      >
        {mainSubcategories.map((sub) => {
          const subSubcategories = getSubSubcategories(sub.id);
          return (
            <div key={sub.id} className="relative group flex-shrink-0">
              <Link
                href={`/subcategory/${encodeURIComponent(sub.id)}`}
                className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all"
              >
                {capitalize(sub.name)}
              </Link>

              {subSubcategories.length > 0 && (
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md z-999 mt-1 rounded-lg">
                  {/* Dinamik balandlik, scrollsiz, max-height o‘chirildi */}
                  <div className="min-w-[200px]" style={{ maxHeight: "none" }}>
                    {subSubcategories.map((subsub) => (
                      <Link
                        key={subsub.id}
                        href={`/subsubcategory/${encodeURIComponent(subsub.id)}`}
                        className="block px-3 py-2 hover:bg-gray-100 whitespace-nowrap text-sm md:text-base font-medium rounded-md"
                      >
                        {capitalize(subsub.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Chap / O‘ng tugmalar */}
      <div className="absolute right-2 flex gap-2">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}