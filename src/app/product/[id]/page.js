
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetAllSubcategoriesQuery,
  useGetAllSubSubcategoriesQuery,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
} from "@/lib/api/productApi";
import ProductGallery from "@/components/productGallery";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrump";
import OpenModal from "@/components/openModal";
import { AnimatePresence } from "framer-motion";
import { addBags, addFavorite, removeFavorite, removerBags } from "@/lib/slice/Slice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import SelectedProduct from "@/components/SelectedProduct";

export default function ProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { data: products, isLoading } = useGetAllProductsQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: subcategories } = useGetAllSubcategoriesQuery();
  const { data: subsubcategories } = useGetAllSubSubcategoriesQuery();
  const { data: ordersData, isLoading: isOrdersLoading } = useGetAllOrdersQuery();
  const [createOrder] = useCreateOrderMutation();

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [paymentType, setPaymentType] = useState("");
  const [address, setAddress] = useState("");

  const user = useSelector((state) => state.user.user);
  const bags = useSelector((state) => state.bags.items);
  const favorites = useSelector((state) => state.favorute.items);
  const userArr = user?.user;

  const orderedItems = ordersData
    ?.flatMap((order) =>
      order.items.map((item) => ({
        ...item,
        order_id: order.id,
        user_id: order.user_id,
        status: order.status,
      }))
    )
    ?.filter((item) => item.user_id === userArr?.id) || [];

  // Faol buyurtma mavjudligini tekshirish
  const hasActiveOrder = orderedItems.some(
    (ord) => !["cancelled", "completed"].includes(ord.status)
  );

  useEffect(() => {
    if (products && params?.id) {
      const found = products.find((p) => String(p.id) === String(params.id));
      setProduct(found || null);
      if (found && !quantities[found.id]) { // Only set if quantity isn't already defined
        setQuantities((prev) => ({ ...prev, [found.id]: 1 }));
      }
    }
  }, [products, params?.id]); // Removed quantities from dependencies

  const updateQuantity = (id, delta, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = current + delta;
      if (updated < 1 || updated > stock) {
        if (!toast.isActive(`qty-limit-${id}`)) {
          toast.error(`Mahsulot miqdori 1 dan kam va ${stock} dan ortiq bo‘lishi mumkin emas`, {
            toastId: `qty-limit-${id}`,
          });
        }
        return prev;
      }
      return { ...prev, [id]: updated };
    });
  };

  const getOrderButtonLabel = (status) => {
    switch (status) {
      case "pending":
        return "Buyurtma tayyorlanmoqda";
      case "processing":
        return "Buyurtma ishlov berilmoqda";
      case "shipped":
        return "Buyurtma yetkazilmoqda";
      case "cancelled":
      case "completed":
        return "Sotib olish";
      default:
        return "Sotib olish";
    }
  };

  const toggleBag = () => {
    const isInBag = bags.some((item) => item.id === product.id);
    const orderItem = orderedItems.find((ord) => ord.product_id === product.id);

    if (isInBag && orderItem && !["cancelled", "completed"].includes(orderItem.status)) {
      setSelectProduct(true);
      toast.error("Bu mahsulot uchun faol buyurtma mavjud, uni savatdan olib tashlab bo‘lmaydi!", {
        toastId: `active-order-${product.id}`,
      });
      return;
    }

    if (isInBag) {
      dispatch(removerBags({ id: product.id }));
      toast.success("Mahsulot savatdan olib tashlandi");
    } else {
      dispatch(addBags(product));
      toast.success("Mahsulot savatga qo‘shildi");
    }
  };

  const toggleFavorite = () => {
    const isFavorited = favorites.some((fav) => fav.id === product.id);
    if (isFavorited) {
      dispatch(removeFavorite({ id: product.id }));
      toast.success("Mahsulot sevimlilardan olib tashlandi");
    } else {
      dispatch(addFavorite(product));
      toast.success("Mahsulot sevimlilarga qo‘shildi");
    }
  };

  const handleBuy = () => {
    if (!user || !userArr?.id) {
      Cookies.set("redirectAfterLogin", `/product/${params?.id}`);
      router.push("/Auth");
      return;
    }

    if (hasActiveOrder) {
      setSelectProduct(true);
      toast.error("Sizda faol buyurtma mavjud, yangi buyurtma berish mumkin emas!", {
        toastId: `active-order-${product.id}`,
      });
      return;
    }

    setSelectedItems([{ ...product, quantity: quantities[product.id] || 1 }]);
    setShowOrderModal(true);
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * (quantities[item.id] || 1),
      0
    );
  };

  const finalizeOrder = async () => {
    if (!user || !userArr?.id) {
      Cookies.set("redirectAfterLogin", `/product/${params?.id}`);
      router.push("/Auth");
      return;
    }

    if (hasActiveOrder) {
      setSelectProduct(true);
      toast.error("Sizda faol buyurtma mavjud, yangi buyurtma berish mumkin emas!", {
        toastId: `active-order-${product.id}`,
      });
      return;
    }

    const total = calculateTotal();
    if (deliveryOption === "delivery" && total < 100000) {
      toast.error("Yetqazib berish uchun umumiy summa kamida 100,000 so‘m bo‘lishi kerak");
      return;
    }
    if (deliveryOption === "delivery" && !address.trim()) {
      toast.error("Iltimos, yetkazib berish manzilini kiriting");
      return;
    }
    if (paymentType === "") {
      toast.error("To‘lov turini tanlang");
      return;
    }

    try {
      const orderData = {
        user_id: userArr.id,
        total_amount: total,
        payment_type: paymentType,
        address: deliveryOption === "delivery" ? address : "Do‘kondan olib ketish",
        items: selectedItems.map((item) => ({
          product_id: item.id,
          quantity: quantities[item.id] || 1,
          price: item.price,
        })),
      };

      const res = await createOrder(orderData).unwrap();
      toast.success(`Buyurtma qabul qilindi. ID: ${res.id}`);
      setShowOrderModal(false);
      setSelectedItems([]);
      setDeliveryOption("pickup");
      setPaymentType("naxt");
      setAddress("");
    } catch (err) {
      console.error("Buyurtma xatosi:", err);
      toast.error(err?.data?.message || "Buyurtma berishda xatolik yuz berdi");
    }
  };

  if (isLoading || isOrdersLoading || !product) {
    return <p className="text-center py-10">Mahsulot yoki buyurtmalar yuklanmoqda...</p>;
  }

  const isFavorited = favorites.some((fav) => fav.id === product.id);
  const isInBag = bags.some((item) => item.id === product.id);
  const quantity = quantities[product.id] || 1;

  const productCategory = categories?.find((cat) => cat.id === product.category_id);
  const productSubcategory = subcategories?.find((sub) => sub.id === product.subcategory_id);
  const productSubSubcategory = subsubcategories?.find((subsub) => subsub.id === product.subsubcategory_id);

  // product.images ni tekshirish
  const safeImages = Array.isArray(product.images) ? product.images : [];

  return (
    <div className="px-4 sm:px-6 lg:px-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ProductGallery
            images={safeImages}
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-base sm:text-lg">{product.description}</p>
            <p className="text-xl sm:text-2xl font-semibold text-green-600">
              {product.price} so‘m
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
              <p className="text-sm sm:text-base">Qolgan mahsulot: {product.stock}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, -1, product.stock)}
                  className="border px-3 py-1 rounded hover:bg-gray-100"
                >
                  −
                </button>
                <span className="min-w-[30px] text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, 1, product.stock)}
                  className="border px-3 py-1 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleBuy}
                className={`${
                  hasActiveOrder ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white"
                } w-full sm:w-auto`}
                disabled={hasActiveOrder}
              >
                {hasActiveOrder
                  ? "Faol buyurtma mavjud"
                  : orderedItems.find((ord) => ord.product_id === product.id)
                  ? getOrderButtonLabel(orderedItems.find((ord) => ord.product_id === product.id).status)
                  : "Sotib olish"}
              </Button>
              <Button
                onClick={toggleBag}
                variant={isInBag ? "destructive" : "green"}
                className={`${
                  isInBag &&
                  orderedItems.some(
                    (ord) => ord.product_id === product.id && !["cancelled", "completed"].includes(ord.status)
                  )
                    ? "bg-gray-400 cursor-not-allowed"
                    : ""
                } w-full sm:w-auto`}
                disabled={
                  isInBag &&
                  orderedItems.some(
                    (ord) => ord.product_id === product.id && !["cancelled", "completed"].includes(ord.status)
                  )
                }
              >
                {isInBag ? "Savatdan olib tashlash" : "Savatga qo‘shish"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showOrderModal && (
          <OpenModal
            updateQuantity={updateQuantity}
            quantities={quantities}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            open={showOrderModal}
            setOpen={setShowOrderModal}
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            address={address}
            setAddress={setAddress}
            calculateTotal={calculateTotal}
            finalizeOrder={finalizeOrder}
            isOrderLoading={false}
          />
        )}
        {selectProduct && (
          <SelectedProduct setSelectProduct={setSelectProduct} selectProduct={selectProduct} />
        )}
      </AnimatePresence>
    </div>
  );
}
