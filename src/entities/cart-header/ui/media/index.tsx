import classNames from "classnames";

import classes from "./cart-header-media.module.scss";
import CartFunctional from "~/src/features/cart/ui/content/functional";

interface Props {
  deleteMarked: () => void;
  onChecboxChange: (selectAll: boolean) => void;
}

export default function CartHeaderMedia({
  deleteMarked,
  onChecboxChange,
}: Props) {
  return (
    <div className={classNames(`flex-column`, classes.container)}>
      <h3 className="heading h4 text-neutral-1000 text-center">Корзина</h3>
      <CartFunctional
        onCheckboxChange={onChecboxChange}
        onDeleteClick={deleteMarked}
      />
    </div>
  );
}
