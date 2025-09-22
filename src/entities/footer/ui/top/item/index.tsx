import React from "react";
import { useRouter } from "next/navigation";

import classes from "./item.module.scss";
import Button from "~/src/shared/ui/button";
import { FooterLinkListI } from "~/src/entities/footer/model/footer.interface";

interface Props extends FooterLinkListI {}

export default function FooterTopItem({ title, links }: Props) {
  const { push } = useRouter();
  return (
    <section className={`flex-column gap-5 flex-start ${classes.container}`}>
      <h6 className="text-16 bold uppercase white second-family">{title}</h6>
      <ul className="flex-column gap-3 flex-start">
        {links.map((item, index) => {
          return (
            <li key={`${item.link}-${index}`}>
              <Button
                typeButton="ghost"
                size="0"
                onClick={() => {
                  if (item.link) push(item.link);
                }}
                className={classes.button}
              >
                <span className="text-16 regular white opacity-08 second-family text-left">
                  {item.title}
                </span>
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
