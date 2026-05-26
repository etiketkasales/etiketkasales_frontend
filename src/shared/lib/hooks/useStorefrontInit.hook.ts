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

/**
 * Однократная инициализация витрины (не админки).
 * Повторный запуск из-за смены ссылок на колбэки давал «перезагрузку» и сброс isLoggedIn.
 */
export const useStorefrontInit = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const bootstrapped = useRef(false);

  useFiltersInit({ enabled: !isAdmin });

  const { handleGetUser } = useUser();
  const { updateCart } = useCart({ needInitialize: false });

  useEffect(() => {
    if (isAdmin) return;
    if (bootstrapped.current) return;

    let cancelled = false;

    void waitForAuthBootstrap().then(() => {
      if (cancelled || bootstrapped.current) return;
      bootstrapped.current = true;

      let remember = false;
      remember = localStorage.getItem("needRemember") === "true";
      dispatch(setUser({ needRemember: remember }));

      void updateCart();

      if (!remember) {
        dispatch(setUser({ isLoggedIn: false }));
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
        dispatch(setUser({ isLoggedIn: false }));
        return;
      }

      void waitForAuthReady(20_000).then((ok) => {
        if (cancelled) return;
        if (ok && hasValidAccessToken()) {
          loadProfile();
        } else if (!isAuthRefreshLocked() && !hasRefreshToken()) {
          dispatch(setUser({ isLoggedIn: false }));
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isAdmin, dispatch, updateCart, handleGetUser]);
};
