import React from "react";

import LinkContainer from "~/src/shared/ui/link-container/ui";
import { IHeaderLink } from "~/src/entities/header-default/model/header-default.interface";

interface Props extends IHeaderLink {}

export default function HeaderLink({ title, href }: Props) {
  return (
    <LinkContainer link={href} className="text-body m text-neutral-1000">
      {title}
    </LinkContainer>
  );
}
