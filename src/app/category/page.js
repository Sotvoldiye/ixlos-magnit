'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useGetAllSubcategoriesQuery, useGetAllProductsQuery } from '@/lib/api/productApi';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { toast } from 'react-toastify';
import CategorySkeleton from '@/components/CategorySkleton';

export default function SubcategoryWithProducts() {
  const { data: subcategories, isLoading: subcategoriesLoading, error: subcategoriesError } = useGetAllSubcategoriesQuery();
  const { data: products, isLoading: productsLoading } = useGetAllProductsQuery();

  if (subcategoriesLoading || productsLoading) {
    return <CategorySkeleton />;
  }

  if (subcategoriesError) {
    toast.error(subcategoriesError?.data?.message || 'Subkategoriyalarni yuklashda xato yuz berdi');
    return <p className="text-center py-10 text-lg text-red-500">Xatolik: {subcategoriesError?.data?.message || 'Nomaʼlum xato'}</p>;
  }

  if (!subcategories || subcategories.length === 0) {
    return <p className="text-center py-10 text-lg text-gray-500">Subkategoriya mavjud emas.</p>;
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {subcategories.map((subcat) => {
        const subcatProducts = (products || []).filter((p) => p?.subcategory_id === subcat?.id);

        // Mahsulotsiz subkategoriyalarni ko‘rsatmaymiz
        if (subcatProducts.length === 0) return null;

        return (
          <div key={subcat.id} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900">{subcat.name}</h2>
              </div>
              <Link
                href={`/subcategory/${subcat.id}`}
                className="text-blue-500 hover:underline text-sm md:text-base"
              >
                Barchasini ko‘rish →
              </Link>
            </div>

            <Carousel
              opts={{ align: 'start', loop: false }}
              className="relative w-full"
            >
              <CarouselContent>
                {subcatProducts.slice(0, 10).map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <Card className="h-full py-3 border-none">
                      <CardContent className="p-2">
                        <ProductCard product={product} />
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
      })}
    </div>
  );
}