"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useFiltersInit } from "~/src/features/filters/lib/hooks";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";
import { waitForAuthBootstrap } from "~/src/shared/lib/api/authBootstrap";
import {
  hasRefreshToken,
  hasValidAccessToken,
  isAuthRefreshLocked,
  waitForAuthReady,
} from "~/src/shared/lib/api/authRefreshLock";

function isFocusedAuthFlow(pathname: string): boolean {
  return (
    pathname.startsWith("/company/registrate") || pathname.startsWith("/login")
  );
}

/**
 * Однократная инициализация витрины (не админки).
 */
export const useStorefrontInit = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isFocusedFlow = isFocusedAuthFlow(pathname);
  const profileBootstrapped = useRef(false);
  const cartBootstrapped = useRef(false);

  useFiltersInit({ enabled: !isAdmin && !isFocusedFlow });

  const { handleGetUser } = useUser();
  const { updateCart } = useCart({ needInitialize: false });

  useEffect(() => {
    if (isAdmin || isFocusedFlow || cartBootstrapped.current) {
      return;
    }

    let cancelled = false;

    void waitForAuthBootstrap().then(() => {
      if (cancelled || cartBootstrapped.current) {
        return;
      }
      cartBootstrapped.current = true;
      void updateCart().catch(() => undefined);
    });

    return () => {
      cancelled = true;
    };
  }, [isAdmin, isFocusedFlow, updateCart]);

  useEffect(() => {
    if (isAdmin) return;
    if (profileBootstrapped.current) return;

    let cancelled = false;

    void waitForAuthBootstrap().then(() => {
      if (cancelled || profileBootstrapped.current) return;
      profileBootstrapped.current = true;

      const remember = localStorage.getItem("needRemember") === "true";
      dispatch(setUser({ needRemember: remember }));

      if (!remember) {
        dispatch(setUser({ isLoggedIn: false, loadingData: false }));
        return;
      }

      const loadProfile = () => {
        void handleGetUser();
      };

      if (hasValidAccessToken()) {
        loadProfile();
        return;
      }

      if (!hasRefreshToken()) {
        dispatch(setUser({ isLoggedIn: false, loadingData: false }));
        return;
      }

      void waitForAuthReady(20_000).then((ok) => {
        if (cancelled) return;
        if (ok && hasValidAccessToken()) {
          loadProfile();
        } else if (!isAuthRefreshLocked() && !hasRefreshToken()) {
          dispatch(setUser({ isLoggedIn: false, loadingData: false }));
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isAdmin, dispatch, handleGetUser]);
};
