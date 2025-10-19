import { RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClickOutside: () => void,
  disabled?: boolean,
) => {
  useEffect(() => {
    if (disabled) return;

    const handler = (event: MouseEvent | PointerEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!ref.current || !target) return;
      if (ref.current.contains(target)) return;
      onClickOutside();
    };

    document.addEventListener("pointerdown", handler as EventListener);
    document.addEventListener("mousedown", handler as EventListener);

    return () => {
      document.removeEventListener("pointerdown", handler as EventListener);
      document.removeEventListener("mousedown", handler as EventListener);
    };
  }, [ref, onClickOutside, disabled]);
};
