import House from "~/public/tabs/house-door-fill.svg";
import Heart from "~/public/tabs/heart-fill.svg";
import Cart from "~/public/tabs/cart2-fill.svg";
import Person from "~/public/tabs/person-circle-fill.svg";
import { TabsItemI } from "./tabs.interface";

export const tabsItems: TabsItemI[] = [
  {
    Icon: House,
    link: "",
  },
  {
    Icon: Heart,
    link: "favorite",
    needDop: "favourites",
  },
  {
    Icon: Cart,
    link: "cart",
    needDop: "cart",
  },
  {
    Icon: Person,
    link: "profile",
  },
];
