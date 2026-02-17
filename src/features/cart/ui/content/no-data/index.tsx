import CartWrapper from "../../wrapper";

export default function CartNoData() {
  return (
    <CartWrapper className={`flex-column padding-20`}>
      <h6 className="heading h7 text-neutral-700">Корзина пуста</h6>
    </CartWrapper>
  );
}
