import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="px-6">
      {/* Breadcrumb skeleton */}
      <div className="mt-4 mb-6">
        <Skeleton className="w-60 h-5" />
      </div>

      <div className="py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: Gallery Skeleton */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-16 h-16 rounded-md" />
              ))}
            </div>
            <Skeleton className="w-[400px] h-[400px] rounded-lg" />
          </div>

          {/* RIGHT: Product Info Skeleton */}
          <div className="space-y-4 w-full">
            <Skeleton className="w-3/4 h-8" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-32 h-7 bg-green-300" />
            
            <div className="flex items-center gap-5">
              <Skeleton className="w-40 h-5" />
              <Skeleton className="w-32 h-8 rounded-xl bg-gray-300" />
            </div>

            <div className="flex items-center gap-5">
              <Skeleton className="w-32 h-10 rounded-lg" />
              <Skeleton className="w-40 h-10 rounded-lg bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
