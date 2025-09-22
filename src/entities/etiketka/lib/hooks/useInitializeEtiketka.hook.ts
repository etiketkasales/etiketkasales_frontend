import { useEffect } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setCart } from "~/src/app/store/reducers/cart.slice";
import { setFavourites } from "~/src/app/store/reducers/favourites.slice";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";
import ObjectUtils from "~/src/shared/lib/utils/object.utils";
import { etiketkaSkeleton } from "../../model/etiketka.skeleton";

interface Props {
  etiketkaInfo: EtiketkaI;
}

export const useInitializeEtiketka = ({ etiketkaInfo }: Props) => {
  const dispatch = useAppDispatch();

  const isSkeleton = ObjectUtils.checkIfSkeleton(
    etiketkaInfo,
    etiketkaSkeleton,
  );

  const checkInfo = (): boolean => {
    if (isSkeleton) return false;
    if (!etiketkaInfo) return false;
    if (!etiketkaInfo.id) return false;
    return true;
  };

  const needInitialize = checkInfo();

  useEffect(() => {
    dispatch(setNavigation({ isEtiketkaPage: true }));
    if (needInitialize) {
      dispatch(setCart({ currentItem: etiketkaInfo }));
      dispatch(setFavourites({ currentItem: etiketkaInfo }));
    }
    return () => {
      dispatch(
        setNavigation({
          isEtiketkaPage: false,
        }),
      );
      dispatch(setCart({ currentItem: undefined }));
      dispatch(setFavourites({ currentItem: undefined }));
    };
  }, [etiketkaInfo]);
};
