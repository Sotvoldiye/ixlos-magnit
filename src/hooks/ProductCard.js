import { useDispatch, useSelector } from "react-redux";
import { addBags, removerBags, addFavorite, removeFavorite } from "@/lib/slice/Slice";

export default function useProductCard(item) {
  const dispatch = useDispatch();
  const favorute = useSelector((state) => state.favorute?.items || []);
  const bags = useSelector((state) => state.bags?.items || []);

  const itemExistsIn = (array, itemToCheck) => {
    if (!array || !Array.isArray(array)) {
      console.warn("itemExistsIn: array is undefined or not an array", array);
      return false;
    }
    if (!itemToCheck || !itemToCheck.id) {
      console.warn("itemExistsIn: itemToCheck is invalid", itemToCheck);
      return false;
    }
    return array.some((i) => i.id === itemToCheck.id);
  };

  const toggleFavorite = () => {
    if (!item || !item.id) {
      console.warn("toggleFavorite: item is invalid", item);
      return;
    }
    if (itemExistsIn(favorute, item)) {
      dispatch(removeFavorite({ id: item.id }));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const toggleBags = () => {
    if (!item || !item.id) {
      console.warn("toggleBags: item is invalid", item);
      return;
    }
    if (itemExistsIn(bags, item)) {
      dispatch(removerBags({ id: item.id }));
    } else {
      dispatch(addBags(item));
    }
  };

  return { itemExistsIn, toggleFavorite, toggleBags, favorute, bags };
}