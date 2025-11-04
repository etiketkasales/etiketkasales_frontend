import React, { useMemo } from "react";

import classes from "./aside-items.module.scss";
import ProfileContainer from "~/src/entities/profile-section/ui/container";
import ProfileAsideItem from "./item";
import { UserRoleType } from "~/src/features/user/model/user.interface";
import {
  buyerTabs,
  sellerTabs,
} from "~/src/entities/profile-section/model/profile.const";
import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  userRole: UserRoleType;
  activeSection: string | null;
  onItemClick: (section: string) => void;
}

export default function ProfileAsideItems({
  userRole,
  activeSection,
  onItemClick,
}: Props) {
  const itemsToMap = useMemo(() => {
    return userRole === "buyer" ? buyerTabs : sellerTabs;
  }, [userRole]);

  return (
    <ProfileContainer
      className={`flex-column ${classes.container}`}
      bgColor="neutral-100"
    >
      {itemsToMap.map((item, index) => {
        const dangerousActions: ProfileActionType[] = ["delete", "logout"];
        const action = item.action;
        const onClick = () => onItemClick(action);
        const isActive = action === activeSection;
        const isDangerous = dangerousActions.includes(action);
        return (
          <ProfileAsideItem
            key={index + action}
            onClick={onClick}
            isActive={isActive}
            isDangerous={isDangerous}
            title={item.title}
          />
        );
      })}
    </ProfileContainer>
  );
}
