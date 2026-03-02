"use client";
import { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "~/src/app/store/hooks";

import scrollLock from "scroll-lock";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customClickOutside?: boolean;
}

export const useModal = ({ isOpen, onClose, customClickOutside }: Props) => {
  const { modalCloseOnOutsideClick } = useAppSelector(selectNavigation);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingByPopState = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      history.pushState({ modal: true }, "");
    }
  }, [isOpen]);

  useEffect(() => {
    const handlePop = () => {
      if (isOpen) {
        closingByPopState.current = true;
        onClose();
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      if (document) {
        scrollLock.disablePageScroll(document.body);
      }
      window.history.pushState(null, "", window.location.href);
    } else {
      if (document) {
        scrollLock.enablePageScroll(document.body);
      }
    }

    return () => {
      if (document) {
        scrollLock.enablePageScroll(document.body);
      }
    };
  }, [isOpen]);

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
