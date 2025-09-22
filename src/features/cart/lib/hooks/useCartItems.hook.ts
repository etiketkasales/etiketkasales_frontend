import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  addEtiketka,
  removeEtiketka,
  selectCart,
} from "~/src/app/store/reducers/cart.slice";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item?: EtiketkaI;
}

export const useCartItems = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { currentItem, cartItems } = useAppSelector(selectCart);
  const [isInCart, setIsInCart] = useState<number>(0);

  useEffect(() => {
    const itemInCart = cartItems.find(
      (i) => i.id === (currentItem?.id ?? item?.id),
    );
    setIsInCart(itemInCart?.in_cart_count || 0);
  }, [currentItem, cartItems, item]);

  const handleAddEtiketka = () => {
    if (item) {
      dispatch(addEtiketka(item));
      return;
    }
    if (!currentItem) return;
    dispatch(addEtiketka(currentItem));
  };

  const handleDeleteEtiketka = (id?: number) => {
    if (id) {
      dispatch(removeEtiketka(id));
      return;
    }
    if (!currentItem) return;
    dispatch(removeEtiketka(currentItem.id));
  };

  return {
    handleAddEtiketka,
    handleDeleteEtiketka,
    isInCart,
  };
};
