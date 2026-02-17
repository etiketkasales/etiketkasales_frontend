import TabsItem from "./item";
import { tabsItems } from "~/src//widgets/tabs/model";
import { ICartItem } from "~/src/features/cart/model";

interface Props {
  cartItems: ICartItem[];
}

export default function TabsList({ cartItems }: Props) {
  return (
    <section className="flex-row space-between padding-0-20 align-center">
      {tabsItems.map((item, index) => {
        return (
          <TabsItem
            key={`${item.link}-${index}`}
            {...item}
            cartItems={cartItems}
          />
        );
      })}
    </section>
  );
}
