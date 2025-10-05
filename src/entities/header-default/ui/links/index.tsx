import React from "react";

import classes from "./header-links.module.scss";
import Container from "~/src/shared/ui/container/ui";
import HeaderLinksSect from "./links-sect";
import HeaderLink from "./link";
import { headerLinks } from "../../model/header-default.const";
import HeaderSelectLocation from "./select-location";

export default function HeaderLinks() {
  return (
    <Container
      bgColor={"yellow-500"}
      className={`flex-row space-between align-center ${classes.container}`}
    >
      <HeaderLinksSect>
        <HeaderLink {...headerLinks[0]} />
        <HeaderSelectLocation />
      </HeaderLinksSect>
      <HeaderLinksSect>
        {headerLinks.slice(1).map((link, index) => (
          <HeaderLink key={index} {...link} />
        ))}
      </HeaderLinksSect>
    </Container>
  );
}
