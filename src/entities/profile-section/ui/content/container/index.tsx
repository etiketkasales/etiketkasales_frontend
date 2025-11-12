import React from "react";
import classNames from "classnames";

import classes from "./profile-content-container.module.scss";
import ProfileContainer from "~/src/entities/profile-section/ui/container";
import LoaderCircle from "~/src/shared/ui/loader-circle";

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
  loading?: boolean;
  needDeleteTitle?: boolean;
}

export default function ProfileContentContainer({
  children,
  className,
  title,
  loading = false,
  needDeleteTitle = true,
}: Props) {
  return (
    <ProfileContainer className={classNames(className, classes.container)}>
      {loading && <LoaderCircle radius={20} />}
      {title && (
        <h1
          className={classNames(`heading h4 text-neutral-1000`, {
            [classes.heading]: needDeleteTitle,
          })}
        >
          {title}
        </h1>
      )}
      {children}
    </ProfileContainer>
  );
}
