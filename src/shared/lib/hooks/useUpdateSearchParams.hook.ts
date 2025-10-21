import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

type Action = "add" | "remove" | "set" | "clear" | "toggle";

// add — добавить значение по ключу
// remove — удалить конкретное значение из кокретного параметра
// set — полностью заменить параметр значениям
// toggle — если есть — удалить значение из параметра, если нет — добавить
// clear — полностью удалить ключ

interface UpdateParamsProps {
  key: string;
  value?: string | string[] | null;
  routerReplace?: boolean;
  action?: Action;
}

const splitValues = (raw?: string | null): string[] => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

const joinValues = (vals: string[]) => vals.join(",");

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    ({
      key,
      value = null,
      routerReplace = false,
      action = "add",
    }: UpdateParamsProps) => {
      const params = new URLSearchParams(searchParams.toString());
      const prev = params.get(key);
      const prevItems = splitValues(prev);
      const updateValue = Array.isArray(value) ? joinValues(value) : value;

      let nextItems: string[] = prevItems.slice(); // copy

      switch (action) {
        case "add":
          if (value) {
            const toAddItems = splitValues(updateValue);
            toAddItems.forEach((v) => {
              if (!nextItems.includes(v)) nextItems.push(v);
            });
          }
          break;

        case "remove":
          if (value) {
            const toRemoveItems = splitValues(updateValue);
            nextItems = nextItems.filter((v) => !toRemoveItems.includes(v));
          }
          break;

        case "toggle":
          if (value) {
            const toToggleItems = splitValues(updateValue);
            toToggleItems.forEach((v) => {
              if (nextItems.includes(v)) {
                nextItems = nextItems.filter((x) => x !== v);
              } else {
                nextItems.push(v);
              }
            });
          }
          break;

        case "set":
          // set replaces whole param with `value` (if value null/empty => delete)
          nextItems = value ? splitValues(updateValue) : [];
          break;

        case "clear":
          nextItems = [];
          break;
      }

      if (nextItems.length === 0) {
        params.delete(key);
      } else {
        params.set(key, joinValues(nextItems));
      }

      const qs = params.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;

      if (routerReplace) {
        router.replace(newUrl, { scroll: false });
      } else {
        router.push(newUrl, { scroll: false });
      }
    },
    [pathname, searchParams, router],
  );

  return updateSearchParams;
};
