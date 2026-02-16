import classes from "./content.module.scss";
import CartFunctional from "./functional";
import CartNoData from "./no-data";
import CartSellers from "./sellers";
import { ICartItem } from "~/src/features/cart/model";

interface Props {
  sellersItems: Array<ICartItem[]>;
  selectItem: (item: ICartItem) => void;
  onCheckboxChange: (selectAll: boolean) => void;
  onDeleteClick: () => void;
}

export default function CartContent({
  sellersItems,
  selectItem,
  onCheckboxChange,
  onDeleteClick,
}: Props) {
  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <CartFunctional
        className={classes.functional}
        onCheckboxChange={onCheckboxChange}
        onDeleteClick={onDeleteClick}
      />
      {sellersItems && sellersItems.length ? (
        <CartSellers sellersItems={sellersItems} selectItem={selectItem} />
      ) : (
        <CartNoData />
      )}
    </div>
  );
}
