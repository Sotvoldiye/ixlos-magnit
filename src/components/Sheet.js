"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/slice/Slice";

export default function SheetMobile({ categorie = [] }) {
  const [step, setStep] = useState("main");
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-xl p-3">
          <i className="fa-solid fa-bars"></i>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-xs overflow-y-auto px-3 py-6 bg-white"
      >
        <SheetHeader>
          <SheetTitle className=" items-start p-1 text-md">
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

        <div className="mt-5 relative">
          <AnimatePresence mode="wait" initial={false}>
            {step === "main" && (
              <motion.div
                key="main"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => setStep("categories")}
                      className="font-medium text-base hover:text-green-600 transition"
                    >
                      Kategoriyalar
                    </button>
                  </li>
                
                </ul>

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
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="text-green-600 hover:underline"
                      >
                        Kirish
                      </Link>{" "}
                      yoki{" "}
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="text-green-600 hover:underline"
                      >
                        Ro‘yxatdan o‘tish
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {step === "categories" && (
              <motion.ul
                key="categories"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 mt-3"
              >
                {categorie.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categorys/${encodeURIComponent(cat.id)}`}
                      onClick={() => setOpen(false)}
                      className="block font-medium hover:text-green-600 transition"
                    >
                      {cat.name}
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
