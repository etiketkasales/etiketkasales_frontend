"use client";

import { useMemo } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { resolveBusinessEntryHref } from "~/src/features/user/lib/resolveBusinessEntryHref";

import Button from "~/src/shared/ui/button";

export default function HeaderForBussiness() {
  const { isLoggedIn, userInfo, loadingData } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);

  const href = useMemo(() => {
    if (!loaded || loadingData) {
      return "/for-bussiness";
    }

    return resolveBusinessEntryHref(userInfo, isLoggedIn);
  }, [isLoggedIn, loaded, loadingData, userInfo]);

  return (
    <Button as={"a"} href={href} typeButton="blue" size="4-12" radius={8}>
      <span className="heading h7 text-blue-100 bold">Для бизнеса</span>
    </Button>
  );
}
