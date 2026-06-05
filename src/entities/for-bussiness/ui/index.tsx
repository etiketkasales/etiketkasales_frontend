"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { setForwardHref } from "~/src/app/store/reducers/login.slice";
import {
  resolveBusinessEntryHref,
  shouldSkipForBusinessLanding,
} from "~/src/features/user/lib/resolveBusinessEntryHref";

import classes from "./for-bussiness.module.scss";
import Button from "~/src/shared/ui/button";

export default function ForBussinessSection() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { isLoggedIn, userInfo, loadingData } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);

  const entryHref = useMemo(() => {
    if (!loaded || loadingData) {
      return "/login";
    }

    return resolveBusinessEntryHref(userInfo, isLoggedIn);
  }, [isLoggedIn, loaded, loadingData, userInfo]);

  useEffect(() => {
    if (!loaded || loadingData || !isLoggedIn) {
      return;
    }

    if (shouldSkipForBusinessLanding(userInfo, isLoggedIn)) {
      push(entryHref);
    }
  }, [entryHref, isLoggedIn, loaded, loadingData, push, userInfo]);

  const onBecomeSellerClick = () => {
    if (!isLoggedIn) {
      dispatch(setForwardHref("/company/registrate/personal"));
      push("/login");
      return;
    }

    push(entryHref);
  };

  return (
    <section
      className={classNames(
        `radius-20 flex-column gap-9 align-center center-element`,
        classes.container,
      )}
    >
      <div className="flex-column gap-7 align-center">
        <h1 className="heading h2 text-center text-yellow-1000">
          Предложите свои этикетки пользователям нашей платформы
        </h1>
        <h2 className="text-body xl text-center text-yellow-1000">
          Зарегистрируйтесь прямо сейчас!
        </h2>
      </div>
      <Button
        typeButton={"white"}
        radius={12}
        className={classes.link}
        onClick={onBecomeSellerClick}
      >
        <span className="text-18 black semibold second-family">
          Стать продавцом
        </span>
      </Button>
    </section>
  );
}
