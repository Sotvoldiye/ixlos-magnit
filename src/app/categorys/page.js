"use client";

import Cards from "@/components/Cards";
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

  if (isLoading) return <p>Loading...</p>;
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
    <div className="space-y-10 px-4">
      {Object.entries(categories).map(([categoryName, products]) => (
        <div key={categoryName} className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold capitalize">{categoryName}</h4>
            <Link
              href={`/categorys/${encodeURIComponent(categoryName)}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Batafsil ko&#39;rish →
            </Link>
          </div>

          <Carousel className=" w-full overflow-hidden">
            <CarouselContent className="flex">
              {products.slice(0, 6).map((product) => {
                return (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 sm:w-1/3 md:basis-1/6 lg:-1/6"
                  >
                    <div className="">
                      <Card>
                        <CardContent>
                          <Cards item={product} />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
}
