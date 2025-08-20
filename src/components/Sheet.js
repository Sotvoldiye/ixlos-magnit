'use client';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useGetAllProductsQuery } from '@/lib/api/productApi';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

export default function SheetMobile() {
  const [step, setStep] = useState('main');
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useGetAllProductsQuery();

  const products = data?.products || [];
  const categories = [...new Set(products.map((p) => p.category))];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-xl p-3">
          <i className="fa-solid fa-bars"></i>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-xs overflow-y-auto px-4 py-6 bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg">
            {step === 'main' ? (
              'Menyu'
            ) : (
              <button onClick={() => setStep('main')} className="text-sm text-green-600 flex items-center">
                <FaChevronLeft className="mr-1" /> Orqaga
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-5 relative">
          <AnimatePresence mode="wait" initial={false}>
            {step === 'main' && (
              <motion.div
                key="main"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-4">
                  <li>
                    <button onClick={() => setStep('categories')} className="font-medium text-base hover:text-green-600 transition">
                      Kategoriyalar
                    </button>
                  </li>
                  <li>
                    <Link href="/daily-deals" onClick={() => setOpen(false)} className="font-medium text-base hover:text-green-600 transition">
                      Kunlik aksiyalar
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 text-sm">
                  <Link href="/login" onClick={() => setOpen(false)} className="text-green-600 hover:underline">
                    Kirish
                  </Link> yoki{' '}
                  <Link href="/register" onClick={() => setOpen(false)} className="text-green-600 hover:underline">
                    Ro‘yxatdan o‘tish
                  </Link>
                </div>
              </motion.div>
            )}

            {step === 'categories' && (
              <motion.ul
                key="categories"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 mt-3"
              >
                {categories.map((cat, i) => (
                  <li key={i}>
                    <Link href={`/categorys/${encodeURIComponent(cat)}`} onClick={() => setOpen(false)} className="flex justify-between items-center hover:text-green-600 transition">
                      <span className="capitalize">{cat}</span>
                      <i className="fa-solid fa-chevron-right text-xs" />
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
