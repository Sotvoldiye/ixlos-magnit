"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/slice/Slice";
import { useGetAllSubSubcategoriesQuery } from "@/lib/api/productApi";

export default function SheetMobile({ subcategories = [] }) {
  const [step, setStep] = useState("main");
  const [open, setOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const user = useSelector((state) => state.user.user);
  const { data: subSubCategories, isLoading, error } = useGetAllSubSubcategoriesQuery();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  const handleSubcategoryClick = (subcatId) => {
    setSelectedSubcategory(selectedSubcategory === subcatId ? null : subcatId);
  };

  // Sub-subkategoriyalarni mos subkategoriya ID si bo‘yicha filtrlash
  const getSubSubCategories = (subcatId) => {
    if (!subSubCategories) return [];
    return subSubCategories.filter((subSubCat) => subSubCat.subcategory_id === subcatId);
  };

  if (isLoading) {
    return <div className="text-center py-4">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Xato: {error.message}</div>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-xl p-3">
          <i className="fa-solid fa-bars"></i>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-xs overflow-y-auto px-3 bg-white"
      >
        <SheetHeader>
          <SheetTitle className="items-start text-md">
            {step === "main" ? (
              "Menyu"
            ) : (
              <button
                onClick={() => setStep("main")}
                className="text-sm text-green-600 flex items-center"
              >
                <FaChevronLeft className="mr-1" /> Orqaga
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {step === "main" && (
              <motion.div
                key="main"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.ul
                  key="subcategories"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 mt-3"
                >
                  {subcategories.map((subcat) => {
                    const relatedSubSubCategories = getSubSubCategories(subcat.id);
                    return (
                      <li key={subcat.id}>
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/subcategory/${encodeURIComponent(subcat.id)}`}
                            onClick={() => setOpen(false)}
                            className="block font-medium hover:text-green-600 transition"
                          >
                            {subcat.name}
                          </Link>
                          {relatedSubSubCategories.length > 0 && (
                            <button
                              onClick={() => handleSubcategoryClick(subcat.id)}
                              className="text-green-600 p-2"
                            >
                              {selectedSubcategory === subcat.id ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                          )}
                        </div>
                        {selectedSubcategory === subcat.id && relatedSubSubCategories.length > 0 && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 pl-3"
                          >
                            {relatedSubSubCategories.map((subSubCat) => (
                              <li key={subSubCat.id}>
                                <Link
                                  href={`/subsubcategory/${encodeURIComponent(subSubCat.id)}`}
                                  onClick={() => setOpen(false)}
                                  className="block text-sm text-gray-600 hover:text-green-600 transition"
                                >
                                  {subSubCat.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </li>
                    );
                  })}
                </motion.ul>

                <div className="mt-6 text-sm">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:underline"
                    >
                      Chiqish
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/Auth"
                        onClick={() => setOpen(false)}
                        className="text-green-600 hover:underline"
                      >
                        Kirish
                      </Link>{" "}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}