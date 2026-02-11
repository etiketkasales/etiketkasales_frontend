import CartSellerItems from "./seller";
import { ICartItem } from "~/src/features/cart/model";

interface Props {
  sellersItems: Array<ICartItem[]>;
  selectItem: (item: ICartItem) => void;
}

export default function CartSellers({ sellersItems, selectItem }: Props) {
  return sellersItems.map((item, index) => {
    return <CartSellerItems key={index} items={item} selectItem={selectItem} />;
  });
}
