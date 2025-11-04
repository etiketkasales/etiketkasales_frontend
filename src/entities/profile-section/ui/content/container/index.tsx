import React from "react";
import classNames from "classnames";

import classes from "./profile-content-container.module.scss";
import ProfileContainer from "~/src/entities/profile-section/ui/container";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ProfileContentContainer({
  children,
  className,
}: Props) {
  return (
    <ProfileContainer className={classNames(className, classes.container)}>
      {children}
    </ProfileContainer>
  );
}
