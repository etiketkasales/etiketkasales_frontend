"use client";
import React, { ReactNode } from "react";
import { useTabs } from "~/src/widgets/tabs/lib/hooks/useTabs.hook";

import classes from "./tabs.module.scss";
import TabsList from "./list";

interface Props {
  TabsButton?: ReactNode;
}

export default function Tabs({ TabsButton }: Props) {
  const { ref, cartItems } = useTabs();

  const getPadding = () => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      return classes.padding_20_28_36;
    }
    return "padding-8";
  };

  return (
    <section
      className={`flex-column white-container fixed gap-4 ${classes.container} ${getPadding()}`}
      ref={ref}
    >
      {TabsButton ? TabsButton : null}
      <TabsList cartItems={cartItems} />
    </section>
  );
}
