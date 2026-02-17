import classes from "./tabs-button.module.scss";
import CartButton from "~/src/entities/cart-button/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  itemId: number;
  quantity: number;
  min: number;
  max: number;
  updateInfo: () => Promise<void>;
}

export default function EtiketkaTabsButton({
  itemId,
  quantity,
  min,
  max,
  updateInfo,
}: Props) {
  return (
    <div className={classes.container}>
      {quantity > 0 && (
        <Button
          typeButton="yellow"
          onClick={() => {}}
          radius={12}
          className={classes.button}
        >
          <span className="heading h7">К оплате</span>
        </Button>
      )}
      <CartButton
        type={quantity > 0 ? "counter" : "with_text"}
        itemId={itemId}
        quantity={quantity}
        minQuantity={min}
        maxQuantity={max}
        updateInfo={updateInfo}
        className={classes.button}
      />
    </div>
  );
}
