"use client";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Position {
  top: number;
  left: number;
  width: number;
}

interface Props {
  isOpen: boolean;
  gap: number;
}

export const usePortalDropdown = <AnchorType extends HTMLElement>({
  isOpen,
  gap,
}: Props) => {
  const anchorRef = useRef<AnchorType | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
  });

  const updatePosition = useCallback(() => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const width = anchorRef.current.offsetWidth;

    setPosition({
      top: rect.bottom + gap + window.scrollY,
      left: rect.left + window.scrollX,
      width,
    });
  }, [gap]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return {
    anchorRef,
    dropdownRef,
    portalStyle: {
      position: "fixed" as const,
      top: position.top,
      left: position.left,
      width: position.width,
      zIndex: 999,
    } as CSSProperties,
  };
};
