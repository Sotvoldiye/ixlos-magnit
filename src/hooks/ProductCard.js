// useProductCard.js
import { useDispatch, useSelector } from "react-redux";
import {
  addBags,
  addFavorute,
  removeFavorute,
  removerBags,
} from "@/lib/slice/Slice";

export default function useProductCard(item) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items || []);
  const bags = useSelector((state) => state.bags.items || []);

  const itemExistsIn = (list) => {
    if (!item || !item.id) return false; // Item mavjudligini tekshirish
    return Array.isArray(list) && list.some((el) => el && el.id === item.id);
  };

  const itemExistsIns = (list, itemOrId) => {
    if (!Array.isArray(list)) return false;

    if (typeof itemOrId === "object" && itemOrId !== null && itemOrId.id) {
      return list.some((el) => el && el.id === itemOrId.id);
    }

    if (typeof itemOrId === "number" || typeof itemOrId === "string") {
      return list.some((el) => el && el.id === itemOrId);
    }

    return false;
  };

  const toggleFavorite = (e) => {
    e?.preventDefault?.(); // Ixtiyoriy event uchun xavfsiz chaqiruv
    if (itemExistsIn(favorites)) {
      dispatch(removeFavorute({ id: item.id }));
    } else {
      dispatch(addFavorute(item));
    }
  };

  const toggleBags = () => { // Event parametri olib tashlandi
    if (itemExistsIn(bags)) {
      dispatch(removerBags({ id: item.id }));
    } else {
      dispatch(addBags(item));
    }
  };

  const toggleFavorited = (product) => {
    if (itemExistsIns(favorites, product)) {
      dispatch(removeFavorute({ id: product.id }));
    } else {
      dispatch(
        addFavorute({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        })
      );
    }
  };

  const toggleBaged = (product) => {
    if (itemExistsIns(bags, product)) {
      dispatch(removerBags({ id: product.id }));
    } else {
      dispatch(
        addBags({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        })
      );
    }
  };

  return {
    favorites,
    bags,
    itemExistsIn,
    itemExistsIns,
    toggleFavorite,
    toggleBags,
    toggleFavorited,
    toggleBaged,
  };
}