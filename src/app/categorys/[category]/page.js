"use client";

import Cards from "@/components/Cards";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { useParams } from "next/navigation";
import React from "react";

export default function CategoryPage() {
  const { category } = useParams();
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filtered = data.products.filter((p) => p.category === category);

  return (
    <div>
      <h3>Kategoriya: {category}</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ width: "150px" }}>
            <Cards item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
