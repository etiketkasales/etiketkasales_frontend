import classes from "./price-cart.module.scss";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import Price from "~/src/shared/ui/price/ui";
import CartButton from "~/src/entities/cart-button/ui";
import Button from "~/src/shared/ui/button";
import ArrowRightShort from "~/public/shared/arrow-right-short.svg";
import { IEtiketka } from "~/src/entities/etiketka/model";
import { useMemo } from "react";

interface Props {
  item: IEtiketka;
  updateInfo: () => Promise<void>;
}

export default function EtiketkaPriceCart({ item, updateInfo }: Props) {
  const quantityInCart = useMemo(() => {
    // `item.quantity` может быть 0/заглушка даже когда `cart_quantity` уже > 0
    // Поэтому берём максимум из положительных значений
    const qCart = Number(item.cart_quantity);
    const qMain = Number(item.quantity);
    const values = [qCart, qMain].filter((n) => Number.isFinite(n) && n > 0);
    if (values.length === 0) return 0;
    return Math.floor(Math.max(...values));
  }, [item.quantity, item.cart_quantity]);

  const min = Math.max(1, Math.floor(Number(item.min_order_quantity)) || 1);
  const max = Math.floor(Number(item.stock_quantity));

  return (
    <EtiketkaMainContainer
      className={`flex-column gap-5 padding-16 ${classes.container}`}
    >
      <Price price={item.price} old_price={item.old_price} />
      {quantityInCart > 0 ? (
        <div className={classes.buyRow}>
          <CartButton
            type="counter"
            itemId={item.id}
            quantity={quantityInCart}
            minQuantity={min}
            maxQuantity={max}
            updateInfo={updateInfo}
            className={classes.counter}
          />
          <Button
            typeButton="yellow"
            size="12"
            radius={12}
            className={classes.toCart}
            href="/cart"
          >
            <div className="flex-row align-center gap-2">
              <ArrowRightShort />
              <span className="text-yellow-1000 heading h7">Корзина</span>
            </div>
          </Button>
        </div>
      ) : (
        <div className="flex-row gap-10px align-center">
          <CartButton
            itemId={item.id}
            quantity={0}
            minQuantity={min}
            maxQuantity={max}
            type="with_text"
            className={classes.button}
            updateInfo={updateInfo}
          />
        </div>
      )}
    </EtiketkaMainContainer>
  );
}
