"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import Loader from "~/src/shared/ui/loader";

import LoginMain from "~/src/features/login/ui";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, loadingData } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);
  const { forwardHref } = useAppSelector(selectLogIn);

  const shouldRedirect = isLoggedIn && !loadingData && loaded;

  useEffect(() => {
    if (!shouldRedirect) {
      return;
    }

    router.replace(forwardHref || "/profile");
  }, [shouldRedirect, forwardHref, router]);

  if (shouldRedirect) {
    return <Loader radius={20} />;
  }

  return <LoginMain />;
}
