import React from "react";

import classes from "../preview-avatar.module.scss";
import Icon from "~/public/profile/person-fill.svg";
import Container from "~/src/shared/ui/container/ui";
import LoaderCircle from "~/src/shared/ui/loader-circle";

interface Props {
  loading: boolean;
  onClicK: () => void;
}

export default function NoImageAvatar({ loading, onClicK }: Props) {
  return (
    <Container
      bgColor={"yellow-200"}
      className={`${classes.container} pointer`}
      onClick={onClicK}
    >
      {loading && <LoaderCircle radius={100} />}
      <Icon />
    </Container>
  );
}
