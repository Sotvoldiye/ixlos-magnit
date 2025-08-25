"use client";

import HeroCarousel from "@/components/heroCarusel";
import Category from "@/app/category/page";
import CategoriesList from "@/components/CategoriesListX";
import CategoryListY from "@/components/CategoryListY";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "@/lib/api/productApi";
import LeftTheSlieder from "@/components/LeftTheSlieder";

export default function Home() {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const { data: productsData, isLoading: prodLoading } =
    useGetAllProductsQuery();
  const categories = data || [];
    if(error){
      <p>Xatolik server bilan bog&aposlanib bo&aposlmadi</p>
      return
    }
  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="bg-white md:px-15  sm:px-2 md:block">
        {" "}

        <CategoriesList categories={categories} products={productsData || []} />
      </div>
      <main className="md:px-15 sm:px-2">
        <div className=" lg:flex lg:items-start md:flex md:items-start md:gap-4 md:py-3 sm:py-3 lg:py-3 py-0 sm:grid sm:grid-cols-3 ">
          <div className="sm:col-span-1 md:inline lg:inline hidden">
            <CategoryListY categories={categories} />
          </div>
          <div className="sm:col-span-2">
            <HeroCarousel />
          </div>

          {/* Button container */}
          <div className=" hidden sm:hidden md:inline ">
            <LeftTheSlieder />
          </div>
        </div>

        <Category />
      </main>
    </div>
  );
}
