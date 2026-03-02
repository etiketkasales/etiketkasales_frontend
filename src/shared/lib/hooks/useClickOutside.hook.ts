"use client";
import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: () => void,
  ref?: RefObject<T | null>,
  disabled?: boolean,
) => {
  const defaultRef = useRef<T | null>(null);

  useEffect(() => {
    if (disabled) return;

    const handler = (event: MouseEvent | PointerEvent | TouchEvent) => {
      const target = event.target as Node | null;
      const currentRef = defaultRef.current ?? ref?.current;
      if (!currentRef || !target) return;
      if (currentRef.contains(target)) return;
      onClickOutside();
    };

    document.addEventListener("pointerdown", handler as EventListener);
    document.addEventListener("mousedown", handler as EventListener);

    return () => {
      document.removeEventListener("pointerdown", handler as EventListener);
      document.removeEventListener("mousedown", handler as EventListener);
    };
  }, [ref, onClickOutside, disabled]);

  return defaultRef;
};
