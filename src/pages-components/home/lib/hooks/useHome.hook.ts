import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCategories } from "~/src/app/store/reducers/categories.slice";
import { getSectionItems } from "~/src/pages-components/home/lib/api/home.api";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface SectionI {
  items: EtiketkaI[];
  title: string;
  categoryId: string;
}

export const useHome = () => {
  const { categories } = useAppSelector(selectCategories);
  const [sections, setSections] = useState<SectionI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getSectionsIds = useCallback((): string[] => {
    if (!categories || !categories.length) return [];
    const ids: string[] = categories.map((category) => category.id);

    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    return ids.slice(0, 3);
  }, [categories]);

  const getSectionTitle = useCallback(
    (section_id: string) => {
      const categoryTitle = categories.find(
        (category) => category.id === section_id,
      )?.name;

      return categoryTitle ?? "";
    },
    [categories],
  );

  const getSections = useCallback(async () => {
    const ids = getSectionsIds();
    const result: SectionI[] = [];

    await promiseWrapper({
      setLoading,
      callback: async () => {
        for (const id of ids) {
          const response = await getSectionItems(id, 5);
          if (!response) continue;

          if (!response.data[0].id) continue;
          result.push({
            items: response.data,
            title: getSectionTitle(id),
            categoryId: id,
          });
        }
        if (!result.length) {
          setSections([]);
        } else {
          setSections(result);
        }
      },
    });
  }, [getSectionsIds, getSectionTitle]);

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    let isMounted = true;
    if (isMounted) {
      getSections();
    }

    return () => {
      isMounted = false;
    };
  }, [categories, getSections]);

  return {
    loading,
    sections,
  };
};
