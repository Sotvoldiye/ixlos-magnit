"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetAllSubcategoriesQuery,
  useGetAllSubSubcategoriesQuery,
  useCreateOrderMutation
} from "@/lib/api/productApi";
import ProductGallery from "@/components/productGallery";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrump";
import Login from "@/components/Login";
import { AnimatePresence } from "framer-motion";
import { addBags, addFavorute, removeFavorute, removerBags } from "@/lib/slice/Slice";
import { toast } from "react-toastify";

export default function ProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { data: products, isLoading } = useGetAllProductsQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: subcategories } = useGetAllSubcategoriesQuery();
  const { data: subsubcategories } = useGetAllSubSubcategoriesQuery();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [createOrder] = useCreateOrderMutation();

  const user = useSelector((state) => state.user.user);
  const bags = useSelector((state) => state.bags.items);
  const favorites = useSelector((state) => state.favorute.items);

  useEffect(() => {
    if (products && params?.id) {
      const found = products.find((p) => String(p.id) === String(params.id));
      setProduct(found || null);

      // Dastlabki quantity sozlash
      if (found) {
        setQuantities((prev) => ({
          ...prev,
          [found.id]: 1
        }));
      }
    }
  }, [products, params?.id]);

  if (isLoading || !product) return <p>Loading ....</p>;

  const quantity = quantities[product.id] || 1;
  const isFavorited = favorites.some((fav) => fav.id === product.id);

  const updateQuantity = (id, delta, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = current + delta;
      if (updated < 1 || updated > stock) {
        if (!toast.isActive(`qty-limit-${id}`)) {
          toast.error(`Mahsulot miqdori 1 dan kam va ${stock} dan ortiq bo‘lishi mumkin emas`, { toastId: `qty-limit-${id}` });
        }
        return prev;
      }
      return { ...prev, [id]: updated };
    });
  };

  const toggleBag = () => {
    const isInBag = bags.some((item) => item.id === product.id);
    if (isInBag) {
      dispatch(removerBags({ id: product.id }));
    } else {
      dispatch(addBags(product));
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorute({ id: product.id }));
    } else {
      dispatch(addFavorute(product));
    }
  };

  const handleBuy = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!user.id) {
      toast.error("Foydalanuvchi ma’lumotlari topilmadi. Iltimos, qayta kiring.");
      setShowLoginModal(true);
      return;
    }

    try {
      const orderData = {
        user_id: user.id,
        total_amount: product.price * quantity,
        items: [
          {
            product_id: product.id,
            quantity,
            price: product.price,
          },
        ],
      };

      const res = await createOrder(orderData).unwrap();
      toast.success(`Buyurtma qabul qilindi. ID: ${res.id}`);
    } catch (err) {
      console.error("Buyurtma xatosi:", err);
      toast.error("Buyurtma berishda xatolik yuz berdi");
    }
  };

  const productCategory = categories?.find((cat) => cat.id === product.category_id);
  const productSubcategory = subcategories?.find((sub) => sub.id === product.subcategory_id);
  const productSubSubcategory = subsubcategories?.find((subsub) => subsub.id === product.subsubcategory_id);

  return (
    <div className="px-6">
      <Breadcrumb
        category={productCategory?.name}
        category_id={productCategory?.id}
        subcategory={productSubcategory?.name}
        subcategory_id={productSubcategory?.id}
        subsubcategory={productSubSubcategory?.name}
        subsubcategory_id={productSubSubcategory?.id}
        title={product.name}
      />

      <div className="py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <ProductGallery
            images={product.images}
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-lg">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">{product.price} so‘m</p>

            <div className="flex gap-5 items-center">
              <p>Qolgan mahsulot: {product.stock}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(product.id, -1, product.stock)} className="border px-3 py-1 rounded hover:bg-gray-100">−</button>
                <span className="min-w-[30px] text-center">{quantity}</span>
                <button onClick={() => updateQuantity(product.id, 1, product.stock)} className="border px-3 py-1 rounded hover:bg-gray-100">+</button>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Button onClick={handleBuy} className="bg-green-600 text-white">
                Sotib olish
              </Button>
              <Button
                onClick={toggleBag}
                variant={bags.some((item) => item.id === product.id) ? "destructive" : "green"}
              >
                {bags.some((item) => item.id === product.id) ? "Savatdan olib tashlash" : "Savatga qo‘shish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
