import React from "react";
import classNames from "classnames";

import classes from "./profile-content-container.module.scss";
import ProfileContainer from "~/src/entities/profile-section/ui/container";

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function ProfileContentContainer({
  children,
  className,
  title,
}: Props) {
  return (
    <ProfileContainer className={classNames(className, classes.container)}>
      {title && (
        <h1
          className={classNames(
            `heading h4 text-neutral-1000`,
            classes.heading,
          )}
        >
          {title}
        </h1>
      )}
      {children}
    </ProfileContainer>
  );
}
