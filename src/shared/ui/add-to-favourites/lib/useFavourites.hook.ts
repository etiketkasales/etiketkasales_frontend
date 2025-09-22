import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  addFavEtiketka,
  clearFavourites,
  removeFavEtiketka,
  selectFavourites,
} from "~/src/app/store/reducers/favourites.slice";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item?: EtiketkaI;
}

export const useFavourites = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { currentItem, favouriteItems } = useAppSelector(selectFavourites);
  const [isInFavourites, setIsInFavourites] = useState<boolean>(false);

  useEffect(() => {
    const itemInFavourites = favouriteItems.find(
      (i) => Number(i.id) === Number(item?.id ?? currentItem?.id),
    );
    if (itemInFavourites) {
      setIsInFavourites(true);
    } else {
      setIsInFavourites(false);
    }
  }, [currentItem, favouriteItems, item]);

  const handleAddEtiketka = () => {
    if (item) {
      dispatch(addFavEtiketka(item));
      return;
    }
    if (!currentItem) return;
    dispatch(addFavEtiketka(currentItem));
  };

  const handleDeleteEtiketka = () => {
    if (item) {
      dispatch(removeFavEtiketka(item.id));
      return;
    }
    if (!currentItem) return;
    dispatch(removeFavEtiketka(currentItem.id));
  };

  return {
    handleAddEtiketka,
    handleDeleteEtiketka,
    isInFavourites,
  };
};
