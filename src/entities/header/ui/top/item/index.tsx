import React from "react";

import HeaderTopLocation from "../location";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { HeaderTopItemI } from "~/src/entities/header/model/header.interface";

interface Props extends HeaderTopItemI {}

export default function HeaderTopItem({ title, link, action }: Props) {
  if (action) return <HeaderTopLocation action={action} />;

  return (
    <li>
      <LinkContainer link={link} className={`text-body m text-neutral-1000`}>
        {title}
      </LinkContainer>
    </li>
  );
}
