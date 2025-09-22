import React from "react";
import { useRouter } from "next/navigation";

import classes from "./top.module.scss";
import Logo from "~/public/footer/logo.svg";
import FooterTopItem from "./item";
import Button from "~/src/shared/ui/button";
import { footerInfo } from "../../model/footer.const";

export default function FooterTop() {
  const { push } = useRouter();
  return (
    <section className={`flex-row gap-80 flex-start ${classes.container}`}>
      <Button
        typeButton={"ghost"}
        size={"0"}
        onClick={() => {
          push("/");
        }}
      >
        <Logo />
      </Button>
      <section
        className={`grid-columns-12 gap-80 grid-start ${classes.inner_container}`}
      >
        {footerInfo.list.map((item, index) => {
          return (
            <FooterTopItem key={index} title={item.title} links={item.links} />
          );
        })}
      </section>
    </section>
  );
}
