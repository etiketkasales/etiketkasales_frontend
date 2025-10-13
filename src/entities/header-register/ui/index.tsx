import React from "react";

import classes from "./header-register.module.scss";
import ImageContainer from "~/src/shared/ui/image-container/ui";
import HeaderRegisterButtons from "./buttons";
import Container from "~/src/shared/ui/container/ui";
import LinkContainer from "~/src/shared/ui/link-container/ui";

export default function HeaderRegister() {
  return (
    <header className="header-container">
      <Container
        className={`${classes.container} flex-row align-center space-between wrapper-header`}
      >
        <LinkContainer link="/">
          <ImageContainer
            src={"/header/logo.png"}
            width={242}
            height={46}
            fixedSize
            alt="logo"
          />
        </LinkContainer>
        <HeaderRegisterButtons />
      </Container>
    </header>
  );
}
