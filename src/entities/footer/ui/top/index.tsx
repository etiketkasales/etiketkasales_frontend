import React from "react";
import classNames from "classnames";

import classes from "./top.module.scss";
import Logo from "~/public/footer/logo.svg";
import FooterTopItem from "./item";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { footerInfo } from "../../model/footer.const";

export default function FooterTop() {
  return (
    <section
      className={classNames(`flex-row gap-80 flex-start`, classes.container)}
    >
      <LinkContainer link="/">
        <Logo />
      </LinkContainer>
      <section
        className={classNames(
          `grid-columns-12 gap-80 grid-start`,
          classes.inner_container,
        )}
      >
        {footerInfo.list.map((item, index) => {
          return (
            <FooterTopItem
              key={index + item.title}
              title={item.title}
              links={item.links}
            />
          );
        })}
      </section>
    </section>
  );
}
