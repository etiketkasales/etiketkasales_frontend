"use client";
import React, { useEffect, useRef } from "react";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useWindowSize } from "react-use";

import classes from "./top.module.scss";
import HeaderTopItem from "./item";
import { headerTopItems } from "~/src/entities/header/model/header.const";
import { HeaderTopItemI } from "~/src/entities/header/model/header.interface";

export default function HeaderTop() {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const lists: { items: HeaderTopItemI[] }[] = [
    {
      items: headerTopItems.slice(0, 2),
    },
    {
      items: headerTopItems.slice(2, 4),
    },
  ];

  useEffect(() => {
    if (width > 768) {
      dispatch(
        setNavigation({
          headerHeight: ref.current?.scrollHeight || 0,
        }),
      );
    }
  }, [width]);

  return (
    <nav
      className={`flex-row space-between gap-6 padding-8-16 container-yellow-500 ${classes.container}`}
      ref={ref}
    >
      {lists.map((list, index) => (
        <ul key={index} className="flex-row gap-8 align-center">
          {list.items.map((item, index) => {
            return <HeaderTopItem {...item} key={`${item.link}-${index}`} />;
          })}
        </ul>
      ))}
    </nav>
  );
}
