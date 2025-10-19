import { RefObject, useCallback, useRef, useState } from "react";
import { useClickOutside } from "~/src/shared/lib/hooks/useClickOutside.hook";

export const useAccordeon = <T extends HTMLElement>(
  clickRef?: RefObject<T | null>,
  clickOutsideControl?: boolean,
) => {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useClickOutside(
    (clickRef as RefObject<T | null>) ?? internalRef,
    () => setOpen(false),
    !clickOutsideControl ? true : false,
  );

  return {
    ref: internalRef,
    open,
    handleClick,
  };
};
