"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryList({ categories }) {
  const containerRef = useRef(null);
  const [visibleCats, setVisibleCats] = useState([]);
  const [hiddenCats, setHiddenCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex gap-26 px-2 py-3  border-gray-300 overflow-hidden">
        <Link
          href={``}
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          Aksiyalar
        </Link>
        <Link
          href={``}
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          Yangiliklar
        </Link>
        <Link
          href={``}
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          Xizmatlar
        </Link>
  
                <Link
          href={``}
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          Miqdori Cheklangan Tovarlar
        </Link>
              <Link
          href={``}
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          Faberlik Biznes
        </Link>
                <Link
          href={``}
          className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
        >
          Faberlik Aksiyalar
        </Link>
        {/* {categories.slice(0, 6).map((cat) => (
          <Link
            key={cat.id}
            href={`/catigories/${cat.id}`}
            className="text-sm md:text-base font-medium hover:underline hover:text-green-600 transition-all flex-shrink-0"
          >
            {cat.name}
          </Link>
        ))} */}
      </div>
    </>
  );
}
