import React from "react";

import classes from "./header-register.module.scss";
import ContainerShared from "~/src/shared/ui/container/ui";
import ImageContainer from "~/src/shared/ui/image-container";
import HeaderRegisterButtons from "./buttons";

export default function HeaderRegister() {
  return (
    <header className="header-container">
      <ContainerShared
        forRow
        className={`${classes.container} align-center space-between wrapper-header`}
        padding={"24"}
        gap={3}
      >
        <ImageContainer
          src={"/header/logo.png"}
          width={242}
          height={46}
          alt="logo"
        />
        <HeaderRegisterButtons />
      </ContainerShared>
    </header>
  );
}
