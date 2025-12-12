"use client";
import React, { ReactNode } from "react";
import { useWindowSize } from "react-use";
import { useTabs } from "~/src/widgets/tabs/lib/hooks/useTabs.hook";

import classes from "./tabs.module.scss";
import TabsList from "./list";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  TabsButton?: ReactNode;
  popList?: boolean;
}

export default function Tabs({ TabsButton, popList = false }: Props) {
  const { width } = useWindowSize();
  const { ref, cartItems } = useTabs();

  const getPadding = () => {
    if (popList) {
      return "padding-8";
    }
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      return classes.padding_20_28_36;
    }
    return "padding-8";
  };

  if (width > 768) return null;

  return (
    <Container
      className={`flex-column white-container fixed gap-4 ${classes.container} ${getPadding()}`}
      ref={ref}
    >
      {TabsButton ? TabsButton : null}
      {!popList && <TabsList cartItems={cartItems} />}
    </Container>
  );
}
