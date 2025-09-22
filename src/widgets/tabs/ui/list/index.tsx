import React from "react";
import TabsItem from "./item";
import { tabsItems } from "~/src//widgets/tabs/model/tabs.const";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  cartItems: EtiketkaI[];
  favouriteItems: EtiketkaI[];
}

export default function TabsList({ cartItems, favouriteItems }: Props) {
  return (
    <section className="flex-row space-between padding-0-20 align-center">
      {tabsItems.map((item, index) => {
        return (
          <TabsItem
            key={`${item.link}-${index}`}
            {...item}
            cartItems={cartItems}
            favouriteItems={favouriteItems}
          />
        );
      })}
    </section>
  );
}
