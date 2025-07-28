"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBags, removerBags, addBags } from "@/lib/slice/Slice";
import useProductCard from "@/hooks/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import OpenModal from "@/components/openModal";
import SelectedProduct from "@/components/SelectedProduct";
import ShowContactDialog from "@/components/ShowContactDialog";

export default function BagsPage() {
  const dispatch = useDispatch();
  const bags = useSelector((state) => state.bags.items || []);
  const favorites = useSelector((state) => state.favorute.items || []);
  const [hydrated, setHydrated] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false); // birinchi modal ni ochish uchun
  const [selectedItems, setSelectedItems] = useState([]); // birinchi modal uchun
  const [selectProduct, setSelectProduct] = useState(false) // ikkinchi modal ni ochish uchun
  const [orderedItems, setOrderedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("orderedItems") || "[]");
    }
    return [];
  }); 
  const [cardCancelDialogOpen, setCardCancelDialogOpen] = useState(false);
  const [cardCancelItemId, setCardCancelItemId] = useState(null);
  const [showContactInfoDialog, setShowContactInfoDialog] = useState(false);

  const { itemExistsIns, toggleFavorited, toggleBaged } = useProductCard();
// birinchi useEffect
  useEffect(() => {
    const stored = localStorage.getItem("bags");
    if (stored) {
      const parsed = JSON.parse(stored);
      dispatch(setBags(parsed));
      const qty = {};
      parsed.forEach((item) => (qty[item.id] = 1));
      setQuantities(qty);
    }
    setHydrated(true);
  }, [dispatch]);

  // uchinchi useEffect 
  useEffect(() => {
    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
  }, [orderedItems]);

  // if lar boshi
  if (!hydrated) return <p className="text-center py-6">Yuklanmoqda...</p>;

  if (bags.length === 0) {
    return <p className="text-center py-6">Saqlangan mahsulotlar yo‘q</p>;
  }
  // if lar o'xiri

// birinchi modalga kerak bo'lgan funksiya
// ikkinchi modal uchun kerak bo'lgan funksiya
  const handleBuyAll = () => {
    const unOrderedItems = bags.filter(
      (item) => !orderedItems.some((ord) => ord.id === item.id)
    );
  
    if (orderedItems.length > 0) {
      toast.warning("Avvalgi buyurtmangiz hali tayyor emas. Yangi buyurtma bera olmaysiz.");
      setSelectProduct(true); //  eslatma modalini ochish
    } else if (unOrderedItems.length > 0) {
      toast.warning("Eslatma: Yetkazib berish faqat Mindonobod uchun mavjud!");
      setSelectedItems(unOrderedItems);
      setOpen(true);
    }
  };
  
// birinchi modalga kerak bo'lgan funkisya
// ikkinchi modal uchun kerak bo'lgan funksiya
  const handleBuySingle = (item) => {
    const isAlreadyOrdered = orderedItems.length > 0;
  
    if (isAlreadyOrdered) {
      toast.warning("Avvalgi buyurtmangiz tayyor emas. Yangi buyurtma bera olmaysiz.");
      setSelectProduct(true); // maxsus eslatma modal
    } else {
      toast.warning("Eslatma: Yetkazib berish faqat Mindonobod uchun mavjud!");
      setSelectedItems([item]);
      setOpen(true);
    }
  };
  

const updateQuantity = (id, delta, stock) => {
  setQuantities((prev) => {
    const current = prev[id] || 1;
    const updated = current + delta;

    if (updated > stock) {
      if (!toast.isActive(`stock-${id}`)) {
        toast.error(`Mahsulo miqdori miqdor: ${stock} `, {
          toastId: `stock-${id}`,
        });
      }
      return prev;
    }

    return { ...prev, [id]: Math.max(1, updated) };
  });
};

// uchunchi modal uchun funksiya
  const handleCardRemove = (item) => {
    if (orderedItems.some((ord) => ord.id === item.id)) {
      setShowContactInfoDialog(true);
    } else {
      dispatch(removerBags({ id: item.id }));
    }
  };

 
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-6">
        {bags.map((item) => {
          const isInFavorites = itemExistsIns(favorites, item);
          const isOrdered = orderedItems.some((ord) => ord.id === item.id);

          return (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition px-2 py-2"
            >
              <div className="flex flex-col relative w-full rounded-lg transition">
                <div className="relative w-full">
                <div className="flex items-center">
                <i
                    className={`text-md absolute right-2 top-2 z-10 cursor-pointer ${
                      isInFavorites
                        ? "fas fa-heart text-red-500 scale-110"
                        : "far fa-heart text-gray-700 hover:text-red-400"
                    }`}
                    onClick={() => toggleFavorited(item)}
                  ></i>
                   
                   <i className={`text-md absolute right-2 top-8 z-10 cursor-pointer ${
                      removerBags
                        ? "fas fa-trash text-gray-500 scale-110"
                        : "far fa-trash text-gray-700"
                    }`}  onClick={() => handleCardRemove(item)}></i>
                </div>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item?.thumbnail}
                      alt={item?.title}
                      width={300}
                      height={300}
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                  </Link>
                </div>

                <Link href={`/product/${item.id}`}>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1 mt-2">
                    {item?.title}
                  </p>
                  <p className="text-[15px] text-gray-900 font-semibold">
                    {item?.price} so‘m
                  </p>
                </Link>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2 items-center">
                    {isOrdered ?<button className="border px-2 bg-gray-200">-</button> :  <button onClick={() => updateQuantity(item.id, -1, item.stock)} className="border px-2">-</button>}
                    <span>{quantities[item.id] || 1}</span>
                    {isOrdered ? <button  className="border px-2 bg-gray-200">+</button> : <button onClick={() => updateQuantity(item.id, 1, item.stock)} className="border px-2">+</button>}
                  </div>
                  
                  <button
                    className={`text-sm text-white py-1 px-3 rounded ${
                      isOrdered ? "bg-gray-400" : "bg-green-600 hover:bg-green-600"
                    }`}
                    // disabled={isOrdered}
                    onClick={() =>{isOrdered ? handleCardRemove(item) : handleBuySingle(item)}}
                  >
                    {isOrdered ? "Buyurtma berldi" : "Sotib olish"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-10">
      {bags.length === 2 ? '' :  <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700" onClick={handleBuyAll}>
          Hammasini sotib olish
      </button> 
      }
      </div>
{/* Birinchi modal */}
      <OpenModal setOrderedItems={setOrderedItems} updateQuantity={updateQuantity} quantities={quantities} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setOpen={setOpen} open={open}/>
{/* ikkinchi modal */}
     <SelectedProduct setSelectProduct={setSelectProduct} selectProduct={selectProduct}/>
{/* uchunchi modal */}
      <ShowContactDialog setShowContactInfoDialog={setShowContactInfoDialog} showContactInfoDialog={showContactInfoDialog}/>

      {orderedItems.length > 0 && (
        <p className="text-center text-green-600 font-medium my-4">
          Buyurtmangiz tayyorlanmoqda...
        </p>
      )}
    </>
  );
}