"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

type Action = "add" | "remove" | "set" | "clear" | "toggle" | "multiClear";

interface UpdateParamsProps {
  key: string | string[];
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
      const keys = Array.isArray(key) ? key : [key];

      keys.forEach((keyStr) => {
        const prev = params.get(keyStr);
        const prevItems = splitValues(prev);
        const updateValue = Array.isArray(value)
          ? joinValues(value)
          : (value ?? "");
        let nextItems: string[] = prevItems.slice();

        switch (action) {
          case "multiClear":
          case "clear":
            nextItems = [];
            break;

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
            nextItems = value ? splitValues(updateValue) : [];
            break;
        }

        if (nextItems.length === 0) {
          params.delete(keyStr);
        } else {
          params.set(keyStr, joinValues(nextItems));
        }
      });

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
