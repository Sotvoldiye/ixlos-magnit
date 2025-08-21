"use client";
import Link from "next/link";

export default function Breadcrumb({ category = [], title, category_id }) {
  return (
    <nav className="text-sm text-gray-500 flex flex-wrap gap-1">
      <Link href="/" className="hover:underline text-gray-700">
        Bosh sahifa
      </Link>
      {category &&(
        <span key={category} className="flex items-center">
          <span className="mx-1">/</span>
          <Link href={`/category/${category_id}`} className="hover:underline">{category}</Link>
        </span>
      )}
      {title && (
        <span className="flex items-center">
          <span className="mx-1">/</span>
          <span className="text-gray-700">{title}</span>
        </span>
      )}
    </nav>
  );
}
