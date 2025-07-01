"use client";

import Cards from "@/components/Cards";
import CategorySkleton from "@/components/CategorySkleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import Link from "next/link";
import React from "react";

export default function Category() {
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <CategorySkleton/>;
  if (error) return <p>Error: {error.message}</p>;

  // Kategoriyalarni tayyorlab olish
  const categories = {};

  data.products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  return (
  <div className="space-y-4 px-4 sm:px-6 lg:px-8">
  {Object.entries(categories).map(([categoryName, products]) => (
    <div key={categoryName} className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold capitalize">{categoryName}</h4>
        <Link
          href={`/categorys/${encodeURIComponent(categoryName)}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Batafsil ko&#39;rish →
        </Link>
      </div>

   <Carousel className="relative w-full">
  <CarouselContent>
    {products.slice(0, 10).map((product) => (
      <CarouselItem
        key={product.id}
        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
      >
        <Card className="h-full py-3">
          <CardContent className="px-2 py-0">
            <Cards item={product} />
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition"
  />
  <CarouselNext
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition"
  />
</Carousel>


    </div>
  ))}
</div>

  );
}
