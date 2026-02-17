import classNames from "classnames";
import { useCartItems } from "~/src/features/cart/lib/hooks";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks";

import classes from "./with-icon.module.scss";
import InCartAlt from "~/public/shared/in-cart-alt.svg";
import CartFill from "~/public/shared/cart-fill.svg";
import Container from "~/src/shared/ui/container/ui";
import { ICommonCartButton } from "..";

interface Props extends ICommonCartButton {}

export default function CartButtonWithIcon({
  itemId,
  quantity,
  minQuantity,
  className,
  updateInfo,
}: Props) {
  const { handleAddEtiketka } = useCartItems({ itemId });
  const { handleButtonClick, loading } = useCartButton({ updateInfo });
  return (
    <Container
      bgColor={"yellow-500"}
      className={classNames(classes.container, className, {
        [classes.loading]: loading,
      })}
      as="button"
      onClick={async () =>
        await handleButtonClick(() => handleAddEtiketka(minQuantity || 1))
      }
      disabled={loading}
    >
      <InCartAlt
        className={classNames(classes.icon, {
          [classes.active]: quantity > 0,
        })}
      />
      <CartFill
        className={classNames(classes.icon, {
          [classes.active]: !quantity || quantity === 0,
        })}
      />
    </Container>
  );
}
