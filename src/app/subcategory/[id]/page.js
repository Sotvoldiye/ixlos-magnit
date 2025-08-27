"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetAllProductsQuery, useGetAllSubcategoriesQuery } from "@/lib/api/productApi";
import Cards from "@/components/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function SubcategoryPage() {
  const { id } = useParams();
  const subcategoryId = Number(id);

  const { data: products, isLoading: productsLoading } = useGetAllProductsQuery();
  const { data: subcategories, isLoading: subcategoriesLoading } = useGetAllSubcategoriesQuery();

  if (productsLoading || subcategoriesLoading) return <p className="text-center py-10">Loading...</p>;

  // subcategoryga tegishli mahsulotlar
  const filteredProducts = products?.filter(
    (product) => product.subcategory_id === subcategoryId
  ) || [];

  if (!filteredProducts.length) return <p className="text-center py-10 text-red-500">Mahsulot topilmadi.</p>;

  // subcategory nomini olish
  const subcategory = subcategories?.find((sub) => sub.id === subcategoryId);

  return (
    <div className="w-full py-6 px-4 md:px-8">
      <h2 className="text-2xl font-semibold mb-4">{subcategory?.name || "Subcategory"}</h2>

       <Carousel
              opts={{ align: 'start', loop: false }}
              className="relative w-full"
            >
              <CarouselContent>
                {filteredProducts.slice(0, 10).map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <Card className="h-full py-3 border-none">
                      <CardContent className="p-2">
                        <Cards product={product} />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition" />
            </Carousel>
    </div>
  );
}
