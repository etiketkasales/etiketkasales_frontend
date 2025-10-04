import React from "react";

import classes from "./features-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  itemsCount: number;
  href: string;
}

export default function HeaderFeaturesItem({ itemsCount, Icon, href }: Props) {
  return (
    <LinkContainer
      link={href}
      className={`flex-row gap-6px align-center ${classes.container}`}
    >
      <Icon />
      <Container bgColor={"neutral-300"} className={classes.countContainer}>
        <span className="heading h7 text-neutral-700 text-center">
          {itemsCount}
        </span>
      </Container>
    </LinkContainer>
  );
}
