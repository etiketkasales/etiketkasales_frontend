"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import classes from "./aside-items.module.scss";
import ProfileContainer from "~/src/entities/profile-section/ui/container";
import ProfileAsideItem from "./item";
import { IProfile, UserRoleType } from "~/src/features/user/model";
import { getEffectiveAdminRole } from "~/src/refine/auth/roles";
import {
  buyerTabs,
  profileDangerousActions,
  profileModalActions,
  sellerPendingTabs,
  sellerTabs,
} from "~/src/entities/profile-section/model/profile.const";
import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  userRole: UserRoleType | "seller-pending";
  userInfo: IProfile;
  activeSection: string | null;
  onItemClick: (section: string) => void;
  setModalActive: (type: ProfileActionType) => void;
}

export default function ProfileAsideItems({
  userRole,
  userInfo,
  activeSection,
  onItemClick,
  setModalActive,
}: Props) {
  const { push } = useRouter();
  const showAdmin = Boolean(getEffectiveAdminRole(userInfo));
  const itemsToMap = useMemo(() => {
    switch (userRole) {
      default:
        return [];
      case "buyer":
        return buyerTabs;
      case "seller":
        return sellerTabs;
      case "seller-pending":
        return sellerPendingTabs;
    }
  }, [userRole]);

  return (
    <ProfileContainer
      className={`flex-column ${classes.container}`}
      bgColor="neutral-100"
    >
      {itemsToMap.map((item, index) => {
        const action = item.action;
        const onClickDefault = () => onItemClick(action);
        const isActive = action === activeSection;
        const isDangerous = profileDangerousActions.includes(action);
        const isModal = profileModalActions.includes(action);
        return (
          <ProfileAsideItem
            key={index + action}
            onClick={() => {
              if (isModal) {
                setModalActive(item.action);
              } else {
                onClickDefault();
              }
            }}
            isActive={isActive}
            isDangerous={isDangerous}
            title={item.title}
          />
        );
      })}
      {showAdmin && (
        <ProfileAsideItem
          key="admin-panel"
          title="Админ-панель"
          onClick={() => push("/admin/dashboard")}
          isActive={false}
        />
      )}
    </ProfileContainer>
  );
}
