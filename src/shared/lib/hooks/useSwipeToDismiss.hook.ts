"use client";

import { useRef, useState, useCallback } from "react";

type SwipeDirection = "left" | "right";

type UseSwipeToDismissOptions = {
  onDismiss: (direction: SwipeDirection) => void;
  distanceThreshold?: number;
  velocityThreshold?: number;
};

export function useSwipeToDismiss({
  onDismiss,
  distanceThreshold = 120,
  velocityThreshold = 0.5,
}: UseSwipeToDismissOptions) {
  const startX = useRef(0);
  const startTime = useRef(0);
  const isActive = useRef(false);

  const [offsetX, setOffsetX] = useState(0);

  const getX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  const onStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isActive.current = true;
    startX.current = getX(e);
    startTime.current = performance.now();
  }, []);

  const onMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive.current) return;

    const currentX = getX(e);
    setOffsetX(currentX - startX.current);
  }, []);

  const onEnd = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isActive.current) return;

      const endX =
        "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;

      const deltaX = endX - startX.current;
      const distance = Math.abs(deltaX);
      const duration = performance.now() - startTime.current;
      const velocity = distance / duration;

      isActive.current = false;

      if (distance >= distanceThreshold || velocity >= velocityThreshold) {
        const direction: SwipeDirection = deltaX > 0 ? "right" : "left";

        onDismiss(direction);
      } else {
        setOffsetX(0);
      }
    },
    [distanceThreshold, velocityThreshold, onDismiss],
  );

  return {
    offsetX,
    handlers: {
      onMouseDown: onStart,
      onMouseMove: onMove,
      onMouseUp: onEnd,
      onMouseLeave: onEnd,
      onTouchStart: onStart,
      onTouchMove: onMove,
      onTouchEnd: onEnd,
    },
  };
}
