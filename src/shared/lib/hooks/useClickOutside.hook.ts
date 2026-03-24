"use client";
import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: () => void,
  ref?: RefObject<T | null>,
  disabled?: boolean,
  extraRefs?: ReadonlyArray<RefObject<HTMLElement | null> | null | undefined>,
) => {
  const defaultRef = useRef<T | null>(null);

  useEffect(() => {
    if (disabled) return;

    const isInsideRefs = (event: MouseEvent | PointerEvent | TouchEvent) => {
      const currentRef = defaultRef.current ?? ref?.current;
      if (!currentRef) return false;

      const path =
        "composedPath" in event && typeof event.composedPath === "function"
          ? event.composedPath()
          : [event.target];

      return path.some((node) => {
        if (!(node instanceof Node)) return false;
        if (currentRef.contains(node)) return true;
        return Boolean(
          extraRefs?.some((er) => er?.current && er.current.contains(node)),
        );
      });
    };

    const handler = (event: MouseEvent | PointerEvent | TouchEvent) => {
      if (isInsideRefs(event)) return;
      queueMicrotask(() => onClickOutside());
    };

    document.addEventListener("click", handler as EventListener);

    return () => {
      document.removeEventListener("click", handler as EventListener);
    };
  }, [ref, onClickOutside, disabled, extraRefs]);

  return defaultRef;
};
