"use client";
import { useCallback, useEffect, useRef } from "react";
import scrollLock from "scroll-lock";
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
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      )
        onClose();
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
    document.addEventListener("click", clickOutside);
    document.addEventListener("touchend", touchOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
      document.removeEventListener("touchend", touchOutside);
    };
  }, [clickOutside, touchOutside, isOpen]);

  return {
    contentRef,
  };
};
