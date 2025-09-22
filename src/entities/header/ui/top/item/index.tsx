"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Button from "~/src/shared/ui/button";
import HeaderTopLocation from "../location";
import { HeaderTopItemI } from "~/src/entities/header/model/header.interface";

interface Props extends HeaderTopItemI {}

export default function HeaderTopItem({ title, link, action }: Props) {
  const { push } = useRouter();

  if (action) return <HeaderTopLocation action={action} />;

  return (
    <li>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          if (link) push(link);
        }}
        needActiveScale={false}
      >
        <span className="text-14 black semibold second-family">{title}</span>
      </Button>
    </li>
  );
}
