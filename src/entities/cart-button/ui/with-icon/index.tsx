"use client";

import classNames from "classnames";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useCartItems } from "~/src/features/cart/lib/hooks";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks";

import classes from "./with-icon.module.scss";
import CartFill from "~/public/shared/cart-fill.svg";
import Container from "~/src/shared/ui/container/ui";
import CartCounterPlusMinus from "../counter/plus-minus";
import { ICommonCartButton } from "..";

interface Props extends ICommonCartButton {}

export default function CartButtonWithIcon({
  itemId,
  quantity,
  minQuantity,
  maxQuantity,
  className,
  updateInfo,
}: Props) {
  const min = minQuantity || 1;
  const max = maxQuantity;
  const qtyInCart = (() => {
    const n = Number(quantity);
    if (!Number.isFinite(n) || n <= 0) return 0;
    return Math.floor(n);
  })();
  const { handleAddEtiketka } = useCartItems({ itemId });
  const { handleButtonClick, loading } = useCartButton({ updateInfo });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (qtyInCart <= 0) setPopoverOpen(false);
  }, [qtyInCart]);

  useEffect(() => {
    if (!popoverOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopoverOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popoverOpen]);

  const updatePopoverPosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    const w = Math.min(220, Math.floor(window.innerWidth * 0.7));
    const left = Math.min(
      Math.max(8, r.right - w),
      window.innerWidth - w - 8,
    );
    setPopoverStyle({
      position: "fixed",
      left,
      top: r.top - 8,
      transform: "translateY(-100%)",
      width: w,
      zIndex: 100_000,
    });
  }, []);

  useLayoutEffect(() => {
    if (!popoverOpen || qtyInCart <= 0) return;
    updatePopoverPosition();
  }, [popoverOpen, qtyInCart, updatePopoverPosition]);

  useEffect(() => {
    if (!popoverOpen) return;
    updatePopoverPosition();
    window.addEventListener("scroll", updatePopoverPosition, true);
    window.addEventListener("resize", updatePopoverPosition);
    return () => {
      window.removeEventListener("scroll", updatePopoverPosition, true);
      window.removeEventListener("resize", updatePopoverPosition);
    };
  }, [popoverOpen, updatePopoverPosition]);

  const onMainClick = async () => {
    if (qtyInCart <= 0) {
      await handleButtonClick(() => handleAddEtiketka(min));
      return;
    }
    setPopoverOpen((open) => !open);
  };

  const badgeText =
    qtyInCart > 99 ? "99+" : qtyInCart > 0 ? String(qtyInCart) : "";

  const showPopover = popoverOpen && qtyInCart > 0 && mounted;

  const portalLayer =
    showPopover && typeof document !== "undefined" ? (
      <>
        {createPortal(
          <div
            className={classes.backdrop}
            aria-hidden
            onClick={() => setPopoverOpen(false)}
          />,
          document.body,
        )}
        {createPortal(
          <div
            className={classes.popover}
            style={popoverStyle}
            role="dialog"
            aria-label="Количество в корзине"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/cart"
              className={classes.buyNow}
              onClick={() => setPopoverOpen(false)}
            >
              Купить сейчас
            </Link>
            <div className={classes.stepper}>
              <CartCounterPlusMinus
                type="minus"
                quantity={qtyInCart}
                min={min}
                max={max}
                itemId={itemId}
                updateInfo={updateInfo}
              />
              <span className={classes.stepperValue}>{qtyInCart}</span>
              <CartCounterPlusMinus
                type="plus"
                quantity={qtyInCart}
                min={min}
                max={max}
                itemId={itemId}
                updateInfo={updateInfo}
              />
            </div>
          </div>,
          document.body,
        )}
      </>
    ) : null;

  return (
    <div ref={wrapperRef} className={classes.root}>
      <Container
        bgColor={"yellow-500"}
        className={classNames(classes.container, className, {
          [classes.loading]: loading,
        })}
        as="button"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void onMainClick();
        }}
        disabled={loading}
      >
        <CartFill className={classes.icon} />
        {qtyInCart > 0 && (
          <span className={classes.badge} aria-label={`В корзине: ${qtyInCart}`}>
            {badgeText}
          </span>
        )}
      </Container>

      {portalLayer}
    </div>
  );
}
