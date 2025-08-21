import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function SelectedProduct({selectProduct,setSelectProduct}) {
  return (
    <Dialog open={selectProduct} onOpenChange={setSelectProduct}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sotib olish uchun avvalgi buyurtmangizni qabul qilishingiz yoki bekor qilishingiz kerak </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-gray-700">
         Buyurtma bekor qilish uchun quyidagi telefon raqam orqali biz bilan bog&#39;lanishingiz mumkin
      </p>
      <p className="text-lg font-semibold mt-2">+998 (99) 305-77-83</p>
            <div className="mt-4 flex justify-end">
        <button onClick={() => setSelectProduct(false)} className="bg-green-600 text-white px-4 py-2 rounded">Yopish</button>
      </div>
    </DialogContent>
  </Dialog>
  )
}
