import React from "react";

import classes from "../preview-avatar.module.scss";
import Icon from "~/public/profile/person-fill.svg";
import Container from "~/src/shared/ui/container/ui";

export default function NoImageAvatar() {
  return (
    <Container bgColor={"yellow-200"} className={`${classes.container} cursor`}>
      <Icon />
    </Container>
  );
}
