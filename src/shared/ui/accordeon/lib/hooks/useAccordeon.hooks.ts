import { RefObject, useCallback, useRef, useState } from "react";
import { useClickOutside } from "~/src/shared/lib/hooks/useClickOutside.hook";

export const useAccordeon = <T extends HTMLElement>(
  defaultOpen: boolean,
  clickRef?: RefObject<T | null>,
  clickOutsideControl?: boolean,
) => {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useClickOutside(
    () => setOpen(false),
    (clickRef as RefObject<T | null>) ?? internalRef,
    !clickOutsideControl ? true : false,
  );

  return {
    ref: internalRef,
    open,
    handleClick,
  };
};
