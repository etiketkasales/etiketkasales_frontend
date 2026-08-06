"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import Loader from "~/src/shared/ui/loader";

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, loadingData, userInfo } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);

  useEffect(() => {
    if (loadingData || !loaded) {
      return;
    }

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (
      userInfo.seller_status === "seller_pending" ||
      userInfo.company_verification_status === "pending"
    ) {
      router.replace("/profile/seller-pending?active_section=quote");
      return;
    }

    // Витрина только buyer/seller; legacy role=admin/super_admin → профиль покупателя.
    const storefrontRole = userInfo.role === "seller" ? "seller" : "buyer";
    router.replace(`/profile/${storefrontRole}`);
  }, [loadingData, loaded, isLoggedIn, userInfo, router]);

  return <Loader radius={20} />;
}
