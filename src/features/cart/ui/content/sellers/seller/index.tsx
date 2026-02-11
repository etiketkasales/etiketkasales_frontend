import classes from "./seller.module.scss";
import CartWrapper from "~/src/features/cart/ui/wrapper";
import SellerInfoContainer from "~/src/shared/ui/seller-info/ui";
import CartSellerItem from "./item";
import { ICartItem } from "~/src/features/cart/model/cart.interface";

interface Props {
  items: ICartItem[];
  selectItem: (item: ICartItem) => void;
}

export default function CartSellerItems({ items, selectItem }: Props) {
  return (
    <CartWrapper className={`flex-column ${classes.container}`}>
      <SellerInfoContainer
        sellerId={items[0].seller_id}
        infoClassName={classes.info}
        wrapperClassName={`flex-column ${classes.wrapper}`}
      />
      <ul className={`flex-column ${classes.list}`}>
        {items.map((item, index) => {
          return (
            <CartSellerItem
              key={`${item.id}-${index}`}
              item={item}
              selectItem={selectItem}
            />
          );
        })}
      </ul>
    </CartWrapper>
  );
}
