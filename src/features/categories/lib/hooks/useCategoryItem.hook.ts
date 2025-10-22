import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setCatalogueActiveCategories } from "~/src/app/store/reducers/catalogue.slice";

export const useCategoryItem = (id: number, name: string) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category_id");
  const ids = currentCategory?.split(",") || [];
  const isActive = ids.includes(id.toString());
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    if (isActive && !initialized.current) {
      initialized.current = true;
      dispatch(setCatalogueActiveCategories(name));
    }
  }, [isActive, name, dispatch]);

  const onItemClick = useCallback(() => {
    initialized.current = true;
    dispatch(setCatalogueActiveCategories(name));
  }, [dispatch, name]);

  return {
    isActive,
    onItemClick,
  };
};
