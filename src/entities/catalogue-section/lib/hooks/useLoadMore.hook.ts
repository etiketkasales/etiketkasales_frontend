import { useCallback, useEffect, useRef } from "react";

interface Props {
  setPage: (page: number) => void;
  page: number;
}

export const useLoadMore = ({ setPage, page }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const coolDown = useRef<boolean>(false);

  const onClick = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  useEffect(() => {
    const buttonRef = ref.current;
    if (!buttonRef) return;
    let timeout: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (coolDown.current) return;
          onClick();
          coolDown.current = true;
          timeout = setTimeout(() => {
            coolDown.current = false;
          }, 2000);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(buttonRef);
    return () => {
      if (buttonRef) {
        observer.unobserve(buttonRef);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [onClick]);

  return {
    ref,
    onClick,
  };
};
