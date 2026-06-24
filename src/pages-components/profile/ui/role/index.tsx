"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileSections } from "~/src/entities/profile-section/lib/hooks";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./role-page.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import ProfileSection from "~/src/entities/profile-section/ui";
import HeaderWithBack from "~/src/entities/header-with-back/ui";
import ProfileModal from "./modal";
import { UserRoleType } from "~/src/features/user/model";
import {
  ProfileActionType,
  profileTitlesMap,
  sellerProfileSectionsHidden,
} from "~/src/entities/profile-section/model";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import Loader from "~/src/shared/ui/loader";

interface Props {
  paramsRole: UserRoleType | "seller-pending";
}

export default function ProfileRolePage({ paramsRole }: Props) {
  const router = useRouter();
  const { userInfo, isLoggedIn, loadingData } = useAppSelector(selectUser);
  const defaultSection = useMemo(() => {
    if (paramsRole === "seller-pending") return "quote";
    return paramsRole === "seller" ? "statistics" : "personal";
  }, [paramsRole]);
  const hiddenSections =
    paramsRole === "seller" ? sellerProfileSectionsHidden : undefined;
  const { activeSection, onItemClick, exitSection, loaded } =
    useProfileSections({
      defaultSection,
      hiddenSections,
    });
  const createNotification = useCreateNotification();
  const [modalType, setModalType] = useState<ProfileActionType | null>(null);

  const pendingRedirect =
    !loadingData &&
    (!isLoggedIn ||
      (paramsRole !== userInfo.role && paramsRole !== "seller-pending"));

  useEffect(() => {
    if (loadingData) {
      return;
    }

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (paramsRole === userInfo.role || paramsRole === "seller-pending") {
      return;
    }

    if (!userInfo.role) {
      createNotification("Не удалось определить роль пользователя", "error");
      router.replace("/login");
      return;
    }

    router.replace("/profile");
  }, [
    loadingData,
    isLoggedIn,
    paramsRole,
    userInfo.role,
    router,
    createNotification,
  ]);

  if (loadingData || pendingRedirect) {
    return (
      <PageWrapper>
        <Loader radius={20} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      CustomHeader={
        <HeaderWithBack
          classNameBackButton={
            activeSection ? classes.active : classes.disabled
          }
          customMediaWidth={1024}
          className={classes.container}
          onBackClick={exitSection}
        >
          <h2 className="heading h2 text-neutral-900 text-center">
            {activeSection ? profileTitlesMap[activeSection] : "Профиль"}
          </h2>
        </HeaderWithBack>
      }
    >
      <ProfileSection
        userInfo={userInfo}
        userRole={paramsRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={(t) => setModalType(t)}
        loaded={!loadingData && loaded}
      />
      <ProfileModal modalType={modalType} onClose={() => setModalType(null)} />
    </PageWrapper>
  );
}
