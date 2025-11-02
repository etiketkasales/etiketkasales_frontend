import { useCallback, useEffect, useRef } from "react";
import scrollLock from "scroll-lock";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customClickOutside?: boolean;
}

export const useModal = ({ isOpen, onClose, customClickOutside }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  const clickOutside = useCallback(
    (event: MouseEvent) => {
      if (customClickOutside) return;
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      )
        onClose();
    },
    [contentRef, onClose, customClickOutside],
  );

  const touchOutside = useCallback(
    (event: TouchEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      )
        onClose();
    },
    [contentRef, onClose],
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
