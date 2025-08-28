"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removerBags, addBags } from "@/lib/slice/Slice";
import useProductCard from "@/hooks/ProductCard";
import { toast } from "react-toastify";
import {
  useGetAllProductsQuery,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
} from "@/lib/api/productApi";
import Login from "@/components/Login";
import Register from "@/components/Register";
import OpenModal from "@/components/openModal";
import SelectedProduct from "@/components/SelectedProduct";
import ShowContactDialog from "@/components/ShowContactDialog";
import Image from "next/image";

export default function BagsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const bags = useSelector((state) => state.bags.items || []);
  const favorites = useSelector((state) => state.favorute.items || []);
  const user = useSelector((state) => state.user.user);
  const userArr = user?.user;

  const { data: products, isLoading: isProductsLoading } = useGetAllProductsQuery();
  const { data: ordersData, isLoading: isOrdersLoading } = useGetAllOrdersQuery();
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const { itemExistsIns, toggleFavorited } = useProductCard();
  const [hydrated, setHydrated] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectProduct, setSelectProduct] = useState(false);
  const [showContactInfoDialog, setShowContactInfoDialog] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [paymentType, setPaymentType] = useState("");
  const [address, setAddress] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";

  // Faol buyurtma mavjudligini tekshirish
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

  const hasActiveOrder = orderedItems.some(
    (ord) => !["cancelled", "completed"].includes(ord.status)
  );

  // Init quantities
  useEffect(() => {
    if (products && bags.length > 0 && !hydrated) {
      const qty = {};
      bags.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) qty[item.id] = quantities[item.id] || 1;
      });
      setQuantities(qty);
      setHydrated(true);
    }
  }, [products, bags, hydrated]);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && !userArr) router.push("/Auth");
  }, [hydrated, userArr, router]);

  // Monitor ordered items and add to bags if status is "completed"
  useEffect(() => {
    if (ordersData && userArr && products) {
      const completedOrders = orderedItems.filter((item) => item.status === "completed");

      completedOrders.forEach((orderItem) => {
        const productId = orderItem.product_id;
        const isInBags = bags.some((bagItem) => bagItem.id === productId);
        if (!isInBags) {
          const product = products?.find((p) => p.id === productId);
          if (product) {
            dispatch(addBags({ id: productId, ...product }));
          }
        }
      });
    }
  }, [ordersData, userArr, bags, products, dispatch]);

  // Umumiy summani hisoblash
  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + (quantities[item.id] || 1) * item.price, 0);
  };

  // Buyurtma berish funksiyasi
  const finalizeOrder = async () => {
    if (!userArr?.id) {
      router.push("/Auth");
      return;
    }

    if (hasActiveOrder) {
      setSelectProduct(true);
      toast.error("Sizda faol buyurtma mavjud, yangi buyurtma berish mumkin emas!", {
        toastId: `active-order-finalize`,
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

    const orderData = {
      user_id: userArr?.id,
      total_amount: total,
      payment_type: paymentType,
      address: deliveryOption === "delivery" ? address : "Do‘kondan olib ketish",
      items: selectedItems.map((item) => ({
        product_id: item.id,
        quantity: quantities[item.id] || 1,
        price: item.price,
      })),
    };

    try {
      const result = await createOrder(orderData).unwrap();
      toast.success(`Buyurtma qabul qilindi. ID: ${result.id}`);
      setSelectedItems([]);
      setOpen(false);
      setDeliveryOption("pickup");
      setAddress("");
      setPaymentType("");
    } catch (error) {
      const errorMessage =
        error.data?.message || error.error || "Buyurtma berishda xatolik yuz berdi";
      toast.error(errorMessage);
    }
  };

  // Modalda mahsulotni o'chirish
  const removeFromModalOnly = (id) => {
    setSelectedItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length === 0) {
        toast.info("Savat bo‘sh");
        setOpen(false);
      }
      return updated;
    });
  };

  const updateQuantity = (id, delta, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = current + delta;
      if (updated > stock) {
        toast.error(`Maksimal miqdor: ${stock}`, { toastId: `stock-${id}` });
        return prev;
      }
      return { ...prev, [id]: Math.max(1, updated) };
    });
  };

  const handleCardRemove = (item) => {
    const orderItem = orderedItems.find((ord) => ord.product_id === item.id);
    if (orderItem && !["cancelled", "completed"].includes(orderItem.status)) {
      setShowContactInfoDialog(true);
      toast.error("Bu mahsulot uchun faol buyurtma mavjud, uni savatdan olib tashlab bo‘lmaydi!", {
        toastId: `active-order-remove-${item.id}`,
      });
      return;
    }
    dispatch(removerBags({ id: item.id }));
    toast.success("Mahsulot savatdan olib tashlandi");
  };

  const handleBuy = (product) => {
    if (!userArr?.id) {
      router.push("/Auth");
      return;
    }

    if (hasActiveOrder) {
      setSelectProduct(true);
      toast.error("Sizda faol buyurtma mavjud, yangi buyurtma berish mumkin emas!", {
        toastId: `active-order-buy-${product.id}`,
      });
      return;
    }

    setSelectedItems([product]);
    setOpen(true);
  };

  const getOrderButtonLabel = (status) => {
    switch (status) {
      case "pending":
        return "Buyurtma tayyorlanmoqda";
      case "processing":
        return "Buyurtma ishlov berilmoqda";
      case "shipped":
        return "Buyurtma yetkazilmoqda";
      case "completed":
        return "Sotib olish";
      case "cancelled":
        return "Buyurtma bekor qilindi";
      default:
        return "Sotib olish";
    }
  };

  if (!hydrated || isProductsLoading || isOrdersLoading) {
    return <p className="text-center py-6">Mahsulotlar yoki buyurtmalar yuklanmoqda...</p>;
  }
  if (!userArr?.id) {
    return null;
  }
  if (bags.length === 0) {
    return <p className="text-center py-6">Saqlangan mahsulotlar yo‘q</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-4 py-4 sm:py-6">
        {bags.map((item) => {
          const product = products?.find((p) => p.id === item.id) || item;
          const isInFavorites = itemExistsIns(favorites, product);
          const orderItem = orderedItems.find((ord) => ord.product_id === product.id);
          const isOrdered = !!orderItem && !["cancelled", "completed"].includes(orderItem.status);

          const imageUrl =
            product?.images?.length > 0
              ? `${BASE_URL}${product.images[0].url}`
              : "/no-image.png";

          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col"
            >
              <div className="flex items-center justify-end gap-2 p-2">
                <i
                  className={`text-md cursor-pointer transition-colors ${
                    isInFavorites
                      ? "fas fa-heart text-red-500 scale-110"
                      : "far fa-heart text-gray-700 hover:text-red-400"
                  }`}
                  onClick={() => toggleFavorited(product)}
                ></i>
                <i
                  className={`text-md cursor-pointer transition-colors ${
                    isOrdered
                      ? "fas fa-trash text-gray-400 cursor-not-allowed"
                      : "fas fa-trash text-gray-700 hover:text-red-500"
                  }`}
                  onClick={() => handleCardRemove(product)}
                ></i>
              </div>
              <Image
                src={imageUrl}
                alt={product?.name}
                width={300}
                height={300}
                className="w-full h-[180px] sm:h-[200px] object-cover rounded-md"
              />
              <div className="flex-1 flex flex-col justify-between px-2 py-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm sm:text-base font-medium text-gray-800 line-clamp-1">
                    {product?.name}
                  </p>
                  <p className="text-sm sm:text-[15px] text-gray-900 font-semibold">
                    {product?.price.toLocaleString()} so‘m
                  </p>
                </div>
                <button
                  className={`mt-3 text-sm sm:text-base text-white py-1 px-3 rounded transition-colors ${
                    hasActiveOrder ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={() => handleBuy(product)}
                  disabled={hasActiveOrder}
                >
                  {hasActiveOrder
                    ? "Faol buyurtma mavjud"
                    : orderItem
                    ? getOrderButtonLabel(orderItem.status)
                    : "Sotib olish"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {bags.length > 1 && (
        <div className="text-center mb-10">
          <button
            className={`bg-green-600 text-white px-6 py-3 rounded transition-colors ${
              hasActiveOrder ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-700"
            }`}
            onClick={() => {
              if (hasActiveOrder) {
                toast.info("Sizda faol buyurtma mavjud, yangi buyurtma berish mumkin emas!", {
                  toastId: "no-orderable-items",
                });
                return;
              }
              const unOrderedItems = bags.filter(
                (item) =>
                  !orderedItems.some(
                    (ord) => ord.product_id === item.id && !["cancelled", "completed"].includes(ord.status)
                  )
              );
              if (unOrderedItems.length === 0) {
                toast.info("Savatda buyurtma qilinadigan mahsulotlar yo‘q", {
                  toastId: "no-orderable-items",
                });
                return;
              }
              setSelectedItems(unOrderedItems);
              setOpen(true);
            }}
            disabled={hasActiveOrder}
          >
            {hasActiveOrder ? "Faol buyurtma mavjud" : "Hammasini sotib olish"}
          </button>
        </div>
      )}
      <OpenModal
        updateQuantity={updateQuantity}
        quantities={quantities}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setOpen={setOpen}
        open={open}
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        address={address}
        setAddress={setAddress}
        calculateTotal={calculateTotal}
        finalizeOrder={finalizeOrder}
        isOrderLoading={isOrderLoading}
      />
      <SelectedProduct setSelectProduct={setSelectProduct} selectProduct={selectProduct} />
      <ShowContactDialog
        setShowContactInfoDialog={setShowContactInfoDialog}
        showContactInfoDialog={showContactInfoDialog}
      />
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
        <div className="mt-10 px-4 mb-4">
          <h3 className="text-xl font-semibold mb-4">Buyurtma berilgan mahsulotlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orderedItems
              .filter((item) => item.status !== "completed")
              .map((item) => {
                const product = products?.find((p) => p.id === item.product_id) || {};
                const imageUrl = product.images?.[0]
                  ? `${BASE_URL}${product.images[0].url}`
                  : "/no-image.png";
                return (
                  <div
                    key={item.product_id + "-" + item.order_id}
                    className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                        <p className="text-sm text-gray-700">
                          {item.price.toLocaleString()} so‘m x {item.quantity}
                        </p>
                        <p
                          className={`mt-1 font-semibold ${
                            item.status === "pending"
                              ? "text-orange-500"
                              : item.status === "processing"
                              ? "text-blue-500"
                              : item.status === "shipped"
                              ? "text-purple-500"
                              : "text-red-500"
                          }`}
                        >
                          {getOrderButtonLabel(item.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {orderedItems.filter((item) => item.status === "completed").length > 0 && (
        <div className="mt-10 px-4 mb-4">
          <h3 className="text-xl font-semibold mb-4">Sotib olingan mahsulotlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orderedItems
              .filter((item) => item.status === "completed")
              .map((item) => {
                const product = products?.find((p) => p.id === item.product_id) || {};
                const imageUrl = product.images?.[0]
                  ? `${BASE_URL}${product.images[0].url}`
                  : "/no-image.png";
                return (
                  <div
                    key={item.product_id + "-" + item.order_id}
                    className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                        <p className="text-sm text-gray-700">
                          {item.price.toLocaleString()} so‘m x {item.quantity}
                        </p>
                        <p className="mt-1 font-semibold text-green-600">
                          {getOrderButtonLabel(item.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}