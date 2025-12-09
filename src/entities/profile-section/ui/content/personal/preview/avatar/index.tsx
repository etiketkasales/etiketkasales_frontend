import React from "react";

import classes from "./preview-avatar.module.scss";
import NoImageAvatar from "./no-image";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import LoaderCircle from "~/src/shared/ui/loader-circle";

interface Props {
  avatar: string | null;
  loading: boolean;
  onClick: () => void;
}

export default function ProfileAvatar({ avatar, loading, onClick }: Props) {
  if (!avatar) return <NoImageAvatar onClicK={onClick} loading={loading} />;

  return (
    <ImageWrapper
      src={avatar}
      width={80}
      height={80}
      className={`${classes.container} pointer`}
      onClick={onClick}
    >
      {loading && <LoaderCircle radius={100} />}
    </ImageWrapper>
  );
}
