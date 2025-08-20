"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBags, removerBags } from "@/lib/slice/Slice";
import useProductCard from "@/hooks/ProductCard";
import { toast } from "react-toastify";

import Login from "@/components/Login";
import Register from "@/components/Register";
import OpenModal from "@/components/openModal";
import SelectedProduct from "@/components/SelectedProduct";
import ShowContactDialog from "@/components/ShowContactDialog";

export default function BagsPage() {
  const dispatch = useDispatch();
  const bags = useSelector((state) => state.bags.items || []);
  const favorites = useSelector((state) => state.favorute.items || []);
  const user = useSelector((state) => state.user.user);

  const [hydrated, setHydrated] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false); // birinchi modal
  const [selectedItems, setSelectedItems] = useState([]); // birinchi modal uchun
  const [selectProduct, setSelectProduct] = useState(false); // ikkinchi modal
  const [orderedItems, setOrderedItems] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("orderedItems") || "[]");
    }
    return [];
  });
  const [showContactInfoDialog, setShowContactInfoDialog] = useState(false);

  // Modallar switch
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { itemExistsIns, toggleFavorited } = useProductCard();

  // LocalStorage bilan sync
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

  useEffect(() => {
    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
  }, [orderedItems]);

  if (!hydrated) return <p className="text-center py-6">Yuklanmoqda...</p>;
  if (bags.length === 0) return <p className="text-center py-6">Saqlangan mahsulotlar yo&apos;q</p>;

  const updateQuantity = (id, delta, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = current + delta;
      if (updated > stock) {
        if (!toast.isActive(`stock-${id}`)) {
          toast.error(`Maksimal miqdor: ${stock}`, { toastId: `stock-${id}` });
        }
        return prev;
      }
      return { ...prev, [id]: Math.max(1, updated) };
    });
  };

  const handleBuySingle = (item) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const isAlreadyOrdered = orderedItems.length > 0;
    if (isAlreadyOrdered) {
      toast.warning("Avvalgi buyurtmangiz tayyor emas. Yangi buyurtma bera olmaysiz.");
      setSelectProduct(true);
    } else {
      toast.warning("Eslatma: Yetkazib berish faqat Mindonobod uchun mavjud!");
      setSelectedItems([item]);
      setOpen(true);
    }
  };

  const handleBuyAll = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const unOrderedItems = bags.filter(
      (item) => !orderedItems.some((ord) => ord.id === item.id)
    );

    if (orderedItems.length > 0) {
      toast.warning("Avvalgi buyurtmangiz tayyor emas. Yangi buyurtma bera olmaysiz.");
      setSelectProduct(true);
    } else if (unOrderedItems.length > 0) {
      toast.warning("Eslatma: Yetkazib berish faqat Mindonobod uchun mavjud!");
      setSelectedItems(unOrderedItems);
      setOpen(true);
    }
  };

  const handleCardRemove = (item) => {
    if (orderedItems.some((ord) => ord.id === item.id)) {
      setShowContactInfoDialog(true);
    } else {
      dispatch(removerBags({ id: item.id }));
    }
  };

  const BASE_URL = "http://127.0.0.1:5000";

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-6">
        {bags.map((item) => {
          const isInFavorites = itemExistsIns(favorites, item);
          const isOrdered = orderedItems.some((ord) => ord.id === item.id);
          const imageUrl =
            item?.images?.length > 0 ? BASE_URL + item.images[0].url : "/no-image.png";

          return (
            <div key={item.id} className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition px-2 py-2">
              <div className="flex flex-col relative w-full rounded-lg transition">
                <div className="relative w-full flex items-center justify-end gap-2">
                  <i
                    className={`text-md z-10 cursor-pointer ${
                      isInFavorites
                        ? "fas fa-heart text-red-500 scale-110"
                        : "far fa-heart text-gray-700 hover:text-red-400"
                    }`}
                    onClick={() => toggleFavorited(item)}
                  ></i>
                  <i
                    className={`text-md z-10 cursor-pointer ${
                      removerBags ? "fas fa-trash text-gray-500 scale-110" : "far fa-trash text-gray-700"
                    }`}
                    onClick={() => handleCardRemove(item)}
                  ></i>
                </div>

                <img src={imageUrl} alt={item?.name} className="w-full h-[200px] object-cover rounded-md" />

                <p className="text-sm font-medium text-gray-800 line-clamp-1 mt-2">{item?.title}</p>
                <p className="text-[15px] text-gray-900 font-semibold">{item?.price} so'm</p>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2 items-center">
                    {isOrdered ? (
                      <button className="border px-2 bg-gray-200">-</button>
                    ) : (
                      <button onClick={() => updateQuantity(item.id, -1, item.stock)} className="border px-2">-</button>
                    )}
                    <span>{quantities[item.id] || 1}</span>
                    {isOrdered ? (
                      <button className="border px-2 bg-gray-200">+</button>
                    ) : (
                      <button onClick={() => updateQuantity(item.id, 1, item.stock)} className="border px-2">+</button>
                    )}
                  </div>

                  <button
                    className={`text-sm text-white py-1 px-3 rounded ${
                      isOrdered ? "bg-gray-400" : "bg-green-600 hover:bg-green-600"
                    }`}
                    onClick={() => (isOrdered ? handleCardRemove(item) : handleBuySingle(item))}
                  >
                    {isOrdered ? "Buyurtma berildi" : "Sotib olish"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-10">
        {bags.length < 2 ? "" : (
          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700" onClick={handleBuyAll}>
            Hammasini sotib olish
          </button>
        )}
      </div>

      {/* Birinchi modal */}
      <OpenModal
        setOrderedItems={setOrderedItems}
        updateQuantity={updateQuantity}
        quantities={quantities}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setOpen={setOpen}
        open={open}
      />
      {/* Ikkinchi modal */}
      <SelectedProduct setSelectProduct={setSelectProduct} selectProduct={selectProduct} />
      {/* Uchinchi modal */}
      <ShowContactDialog setShowContactInfoDialog={setShowContactInfoDialog} showContactInfoDialog={showContactInfoDialog} />

      {/* Login / Register modallar */}
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          onOpenRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <Register
          onClose={() => setShowRegisterModal(false)}
          onOpenLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {orderedItems.length > 0 && (
        <p className="text-center text-green-600 font-medium my-4">
          Buyurtmangiz tayyorlanmoqda...
        </p>
      )}
    </>
  );
}
