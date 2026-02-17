import CartButton from "~/src/entities/cart-button/ui";

interface Props {
  itemId: number;
  itemStock: number;
  itemMin: number;
  itemQuantity: number;
  containerClassName?: string;
}

export default function SellerItemButton({
  itemId,
  itemMin,
  itemStock,
  itemQuantity,
  containerClassName,
}: Props) {
  return (
    <CartButton
      type="counter"
      itemId={itemId}
      minQuantity={itemMin}
      maxQuantity={itemStock}
      quantity={itemQuantity}
      className={containerClassName}
    />
  );
}
