import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";

export default function OpenModal({
  updateQuantity,
  quantities,
  setSelectedItems,
  selectedItems,
  open,
  setOpen,
  deliveryOption,
  setDeliveryOption,
  paymentType,
  setPaymentType,
  address,
  setAddress,
  calculateTotal,
  finalizeOrder,
  isOrderLoading,
}) {
  const BASE_URL = "http://127.0.0.1:5000";

  // Modalni yopish agar mahsulotlar bo'sh bo'lsa
  useEffect(() => {
    if (selectedItems.length === 0 && open) {
      setOpen(false);
    }
  }, [selectedItems, open, setOpen]);

  // Modalda mahsulotni o'chirish
  const removeFromModalOnly = (id) => {
    setSelectedItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length === 0) {
        toast.info("Savat bo'sh");
      }
      return updated;
    });
  };

  // Rasm URLini olish
  const getImageUrl = (item) => {
    if (!item) return "/no-image.png";
    if (item.images && item.images.length > 0) {
      const firstImage = item.images[0];
      return `${BASE_URL}${firstImage.url}`;
    }
    return "/no-image.png";
  };

  const totalPrice = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full sm:max-w-[600px] p-4 sm:p-6 bg-gradient-to-b from-green-50 to-white rounded-lg shadow-xl border border-green-200 max-h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-green-800">
            Sotib olinayotgan mahsulotlar
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
          {/* Mahsulotlar ro'yxati */}
          <div className="space-y-4 max-h-60">
            {selectedItems.map((item) => {
              const imageUrl = getImageUrl(item);
              const quantity = quantities[item.id] || 1;

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-green-200 p-3 rounded-lg bg-white hover:bg-green-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover border border-green-300"
                    />
                    <div>
                      <p className="font-medium text-green-900 line-clamp-1 text-sm sm:text-base">{item.name}</p>
                      <p className="text-sm text-green-700">{item.price.toLocaleString()} so&apos;m</p>
                      <p className="text-xs text-green-600">Qolgan: {item.stock} ta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1, item.stock)}
                      className="border border-green-300 px-2 rounded hover:bg-green-100 transition-colors duration-200 text-green-700 text-sm"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-green-800 font-medium text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1, item.stock)}
                      className="border border-green-300 px-2 rounded hover:bg-green-100 transition-colors duration-200 text-green-700 text-sm"
                      disabled={quantity >= item.stock}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromModalOnly(item.id)}
                      className="text-red-500 text-xs sm:text-sm hover:text-red-600 transition-colors duration-200"
                    >
                      O&apos;chirish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Yetkazib berish va do'kondan olib ketish */}
          <div className="mt-4 sm:mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Yetkazib berish usuli
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                    className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-green-700">Do&apos;kondan olib ketish</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="delivery"
                    checked={deliveryOption === "delivery"}
                    onChange={() => setDeliveryOption("delivery")}
                    disabled={totalPrice < 100000}
                    className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-green-700">
                    Yetkazib berish (100,000 so&apos;mdan yuqori buyurtmalar uchun)
                  </span>
                </label>
                {totalPrice < 100000 && (
                  <p className="text-sm text-green-600 mt-1">
                    Yetkazib berish faqat 100,000 so&apos;mdan yuqori buyurtmalar uchun mavjud
                  </p>
                )}
              </div>
            </div>
            {deliveryOption === "delivery" && (
              <div>
                <label className="block text-sm font-medium text-green-700">Manzil</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-green-800 placeholder-green-400 text-sm sm:text-base"
                  placeholder="Masalan( Mindonobod, Mustaqillik shukronasi 2-ko'cha 32uy)"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-green-700">To&apos;lov turi</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="naxt"
                    checked={paymentType === "naxt"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-green-700">Naqd to&apos;lash</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="click"
                    checked={paymentType === "click"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-green-700">Click</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-right font-semibold border-t border-green-200 pt-4 text-green-800 text-sm sm:text-base">
            Umumiy summa: {totalPrice.toLocaleString()} so&apos;m
          </div>

          <div className="mt-4 sm:mt-6 flex justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors duration-200 text-sm sm:text-base"
            >
              Bekor qilish
            </button>
            <button
              onClick={finalizeOrder}
              className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base ${
                isOrderLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isOrderLoading}
            >
              {isOrderLoading ? "Buyurtma berilmoqda..." : "Buyurtma berish"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}