import { useEffect, useRef, useState } from "react";

export const useSelect = () => {
  const [active, setActive] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        active &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  return {
    active,
    setActive,
    buttonRef,
    contentRef,
    inputRef,
  };
};
