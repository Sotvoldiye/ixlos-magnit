import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";

export default function OpenModal({setOrderedItems,updateQuantity, quantities, setSelectedItems, selectedItems, open,setOpen,  }) {
  const BASE_URL = "http://127.0.0.1:5000";

  // ikkinchi useEffect
  //birinichi modal ni useEffecti
  useEffect(() => {
    if (selectedItems.length === 0 && open) {
      setOpen(false);
    }
  }, [selectedItems, open]);

  // birinchi modalga kerak bo'lgan funksiya
  const removeFromModalOnly = (id) => {
    setSelectedItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length === 0) {
        toast.success("Buyurtmangiz tayyorlanmoqda...");
      }
      return updated;
    });
  };

  // birinchi modalga kerak bo'lgan method
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );
  // birinchi modalga kerak bo'lgan funksiya
  const finalizeOrder = () => {
   if(totalPrice>=  1000){
 toast.success("Buyurtmangiz qabul qilindi");
    setOrderedItems((prev) => [
      ...prev,
      ...selectedItems.map((item) => ({ ...item, ordered: true })),
    ]);
    setOpen(false);
   }else{
    toast.error("Haridingiz 100 000 ga teng yoki undan oshsa yetkazib beriladi")
    setOpen(false)
    return
   }

  };
  return   <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Sotib olinayotgan mahsulotlar</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      {selectedItems.map((item) =>{ 
 const imageUrl =
    item?.images?.length > 0
      ? BASE_URL + item.images[0].url
      : "/no-image.png";
      return(
        <div key={item.id} className="flex justify-between items-center border p-2 rounded">
          <div className="flex items-center gap-3">
            <Image src={imageUrl} alt={item.name} width={60} height={60} className="rounded" />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.price} so&#39;m</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => updateQuantity(item.id, -1, item.stock)} className="border px-2">-</button>
            <span>{quantities[item.id] || 1}</span>
            <button onClick={() => updateQuantity(item.id, 1, item.stock)} className="border px-2">+</button>
            <button onClick={() => removeFromModalOnly(item.id)} className="text-red-500 text-sm">O&#39;chirish</button>
          </div>
        </div>
      )})}
    </div>
    <div className="mt-6 text-right font-semibold">
      Umumiy summa: {totalPrice} so&#39;m
    </div>
    <button className="bg-green-600 p-2 rounded-md text-white" onClick={finalizeOrder}>Buyurtma berish</button>
  </DialogContent>
</Dialog>;
}
