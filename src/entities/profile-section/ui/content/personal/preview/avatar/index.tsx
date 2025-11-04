import React from "react";

import classes from "./preview-avatar.module.scss";
import NoImageAvatar from "./no-image";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

interface Props {
  avatar: string | null;
}

export default function ProfileAvatar({ avatar }: Props) {
  if (!avatar) return <NoImageAvatar />;

  return (
    <ImageWrapper
      src={avatar}
      width={80}
      height={80}
      className={`${classes.imageContainer} cursor`}
    />
  );
}
