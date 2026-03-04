"use client";
import { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customClickOutside?: boolean;
}

export const useModal = ({ isOpen, onClose, customClickOutside }: Props) => {
  const { modalCloseOnOutsideClick } = useAppSelector(selectNavigation);
  const contentRef = useRef<HTMLDivElement>(null);

  const lockScroll = useCallback(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo({
        top: parseInt(scrollY || "0") * -1,
        left: 0,
        behavior: "instant",
      });
    };
  }, []);

  useEffect(() => {
    let enableScroll: () => void;
    if (isOpen) {
      enableScroll = lockScroll();
    }

    return () => enableScroll?.();
  }, [isOpen, lockScroll]);

  const clickOutside = useCallback(
    (event: MouseEvent) => {
      if (customClickOutside) return;
      if (!modalCloseOnOutsideClick) return;
      if (!contentRef.current) return;

      const path = event.composedPath?.() || [];

      const clickedInsideModal = path.includes(contentRef.current);
      const clickedInsidePortal = path.some(
        (el) =>
          el instanceof HTMLElement && el.dataset?.modalLayer !== undefined,
      );

      if (!clickedInsideModal && !clickedInsidePortal) {
        onClose();
      }
    },
    [contentRef, onClose, customClickOutside, modalCloseOnOutsideClick],
  );

  const touchOutside = useCallback(
    (event: TouchEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        modalCloseOnOutsideClick
      )
        onClose();
    },
    [contentRef, onClose, modalCloseOnOutsideClick],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("touchend", touchOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("touchend", touchOutside);
    };
  }, [clickOutside, touchOutside, isOpen]);

  return {
    contentRef,
  };
};
