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
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "@/lib/api/productApi";
import Link from "next/link";

export default function CategoryWithProducts() {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const { data: products, isLoading: prodLoading } = useGetAllProductsQuery();

  if (isLoading || prodLoading) {
    return <p className="text-gray-500">Yuklanmoqda...</p>;
  }

  if (error) {
    return <p className="text-red-500">Xatolik yuz berdi!</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">Kategoriya mavjud emas.</p>;
  }
console.log(categories)
console.log(products)
  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        // kategoriya bo‘yicha productlarni olish
        const catProducts = (products || []).filter(
          (p) => p?.category_id === cat?.id // har doim string qilib solishtiramiz
        );

        return (
          <div key={cat.id}>
            {/* Category nomi */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{cat.name}</h2>
              <Link
                href={`/category/${cat.id}`}
                className="text-blue-500 hover:underline"
              >
                Barchasini ko‘rish →
              </Link>
            </div>
         
           <Carousel className="relative w-full">
  <CarouselContent>
    {catProducts.slice(0, 10).map((product) => (
      <CarouselItem
         key={product.id} 
        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
      >
        <Card className="h-full py-3" key={products.id}>
          <CardContent className="px-2 py-0">
            <Cards product={product} />
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
            {/* {catProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catProducts.map((product) => (
                  <Cards key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Bu kategoriyada mahsulot yo‘q.</p>
            )} */}
          </div>
        );
      })}
    </div>
  );
}
