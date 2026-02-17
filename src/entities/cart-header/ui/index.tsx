import classes from "./cart-header.module.scss";
import HeaderDefault from "../../header-default/ui";
import CartHeaderMedia from "./media";

interface Props {
  deleteMarked: () => void;
  onCheckboxChange: (selectAll: boolean) => void;
}

export default function CartHeader({ deleteMarked, onCheckboxChange }: Props) {
  return (
    <HeaderDefault
      className={classes.container}
      CustomMediaHeader={
        <CartHeaderMedia
          deleteMarked={deleteMarked}
          onChecboxChange={onCheckboxChange}
        />
      }
    />
  );
}
