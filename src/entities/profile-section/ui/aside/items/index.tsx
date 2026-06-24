"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import classes from "./aside-items.module.scss";
import ProfileContainer from "~/src/entities/profile-section/ui/container";
import ProfileAsideItem from "./item";
import { IProfile, UserRoleType } from "~/src/features/user/model";
import { canAccessAdminPanelFromMe } from "~/src/refine/auth/roles";
import { useAuthMe } from "~/src/refine/auth/useAuthMe.hook";
import { useAppSelector } from "~/src/app/store/hooks";
import {
  buyerFooterTabs,
  buyerTabs,
  profileDangerousActions,
  profileModalActions,
  sellerFooterTabs,
  sellerPendingFooterTabs,
  sellerPendingTabs,
  sellerTabs,
} from "~/src/entities/profile-section/model/profile.const";
import {
  IAsideItem,
  ProfileActionType,
} from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  userRole: UserRoleType | "seller-pending";
  userInfo: IProfile;
  activeSection: string | null;
  onItemClick: (section: string) => void;
  setModalActive: (type: ProfileActionType) => void;
}

function renderAsideItem(
  item: IAsideItem,
  activeSection: string | null,
  onItemClick: (section: string) => void,
  setModalActive: (type: ProfileActionType) => void,
) {
  const action = item.action;
  const isActive = action === activeSection;
  const isDangerous = profileDangerousActions.includes(action);
  const isModal = profileModalActions.includes(action);

  return (
    <ProfileAsideItem
      key={action}
      onClick={() => {
        if (isModal) {
          setModalActive(action);
        } else {
          onItemClick(action);
        }
      }}
      isActive={isActive}
      isDangerous={isDangerous}
      title={item.title}
    />
  );
}

export default function ProfileAsideItems({
  userRole,
  userInfo,
  activeSection,
  onItemClick,
  setModalActive,
}: Props) {
  const { push } = useRouter();
  const isLoggedIn = useAppSelector((s) => s.user.isLoggedIn);
  const { data: authMe, hydrated } = useAuthMe({ enabled: isLoggedIn });
  const showAdmin =
    userRole !== "seller" &&
    ((hydrated && isLoggedIn && authMe
      ? canAccessAdminPanelFromMe(authMe)
      : false) ||
      canAccessAdminPanelFromMe({
        user: {
          role: userInfo.role,
          staff_role: userInfo.staff_role ?? null,
        },
        permissions: [],
      }));

  const { mainTabs, footerTabs } = useMemo(() => {
    switch (userRole) {
      default:
        return { mainTabs: [] as IAsideItem[], footerTabs: [] as IAsideItem[] };
      case "buyer":
        return { mainTabs: buyerTabs, footerTabs: buyerFooterTabs };
      case "seller":
        return { mainTabs: sellerTabs, footerTabs: sellerFooterTabs };
      case "seller-pending":
        return {
          mainTabs: sellerPendingTabs,
          footerTabs: sellerPendingFooterTabs,
        };
    }
  }, [userRole]);

  return (
    <ProfileContainer
      className={`flex-column ${classes.container}`}
      bgColor="neutral-100"
    >
      <div className={`flex-column ${classes.main}`}>
        {mainTabs.map((item) =>
          renderAsideItem(item, activeSection, onItemClick, setModalActive),
        )}
      </div>
      {(showAdmin || footerTabs.length > 0) && (
        <div className={`flex-column ${classes.footer}`}>
          {showAdmin && (
            <ProfileAsideItem
              key="admin-panel"
              title="Админ-панель"
              onClick={() => push("/admin/dashboard")}
              isActive={false}
            />
          )}
          {footerTabs.map((item) =>
            renderAsideItem(item, activeSection, onItemClick, setModalActive),
          )}
        </div>
      )}
    </ProfileContainer>
  );
}
