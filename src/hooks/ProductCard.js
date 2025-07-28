import { useDispatch, useSelector } from "react-redux";
import {
  addBags,
  addFavorute,
  removeFavorute,
  removerBags,
} from "@/lib/slice/Slice";

// Custom hook
export default function useProductCard(item) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items);
  const bags = useSelector((state) => state.bags.items);

  const itemExistsIn = (list) => {
    return list.some((el) => el.id === item.id);
  };
  const itemExistsIns = (list, itemOrId) => {
    if (!Array.isArray(list)) return false;
  
    // Agar itemOrId obyekt bo‘lsa => id ni olib tekshir
    if (typeof itemOrId === "object" && itemOrId !== null) {
      return list.some((el) => el && el.id === itemOrId.id);
    }
  
    // Aks holda — bu id deb qabul qilinadi
    return list.some((el) => el && el.id === itemOrId);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (itemExistsIn(favorites)) {
      dispatch(removeFavorute({ id: item.id }));
    } else {
      dispatch(addFavorute(item));
    }
  };

  const toggleBags = (e) => {
    e.preventDefault();
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
    toggleBaged
  };
}
 