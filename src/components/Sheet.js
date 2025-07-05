import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { AnimatePresence,motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SheetMobile() {
  const [step, setStep] = useState("main"); // 'main' | 'categories'
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return  toast.error(error.message);

  const categories = [...new Set(data.products.map((p) => p.category))];


  return (
    <Sheet  open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button><i className="fa-solid fa-bars"></i></button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-none">

        <SheetHeader>
          <SheetTitle className="text-lg">
            {step === "main" ? "Menu" : (
              <button onClick={() => setStep("main")} className="text-sm text-blue-500"><FaChevronLeft/>
              </button>
            )}
          </SheetTitle>
        </SheetHeader>
<div className=" h-full">
<AnimatePresence mode="wait" initial={false}>

    {step === "main" && (
        <div>
            <motion.ul
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
           className="space-y-3 mt-4">
            <li><button onClick={() => setStep("categories")} className="font-medium">Katigoriyalar</button></li>
            <li><button className="font-medium">Aksiyalar</button></li>
            <li><button className="font-medium">Aloqa</button></li>
          </motion.ul>
          <Link href="/login">Kirish</Link> yoki <Link href="/register">Ro&#39;yxatdan o&#39;tish</Link>
        </div>
        )}
      

        {step === "categories" && (
           <motion.ul
           key="categories"
           initial={{ x: 50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           exit={{ x: -50, opacity: 0 }}
           transition={{ duration: 0.3 }}
           className="absolute w-full space-y-2 mx-2"
         >
            {categories.map((cat, i) => (
             <li key={i}>
                 <Link href={`/categorys/${cat}`}   onClick={() => setOpen(false)}
                    className="flex justify-between items-center">
                <span>{cat}</span>
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
