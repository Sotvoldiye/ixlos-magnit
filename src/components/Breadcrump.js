"use client";
import Link from "next/link";

export default function Breadcrumb({ category, subcategory, subsubcategory, title, subcategory_id, subsubcategory_id }) {
  // barcha breadcrumb itemlarini tartib bilan arrayga joylaymiz
  const items = [
    { name: "Bosh sahifa", href: "/" },
    subcategory && { name: subcategory, href: `/subcategory/${subcategory_id}` },
    subsubcategory && { name: subsubcategory, href: `/subsubcategory/${subsubcategory_id}` },
    title && { name: title } // oxirgi item linksiz
  ].filter(Boolean); // null yoki undefined itemlarni filter qiladi

  return (
    <nav className="text-sm text-gray-500 flex flex-wrap gap-1" aria-label="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="mx-1">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:underline text-gray-700">
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-700 font-semibold">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
