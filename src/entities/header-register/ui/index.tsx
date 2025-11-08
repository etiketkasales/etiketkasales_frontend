import React from "react";

import classes from "./header-register.module.scss";
import HeaderRegisterButtons from "./buttons";
import Container from "~/src/shared/ui/container/ui";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

export default function HeaderRegister() {
  return (
    <header className="header-container">
      <Container
        className={`${classes.container} flex-row align-center space-between wrapper-header`}
      >
        <LinkContainer link="/">
          <ImageWrapper
            src={"/header/logo.png"}
            width={242}
            height={46}
            alt="logo"
            className={classes.imgContainer}
          />
        </LinkContainer>
        <HeaderRegisterButtons />
      </Container>
    </header>
  );
}
