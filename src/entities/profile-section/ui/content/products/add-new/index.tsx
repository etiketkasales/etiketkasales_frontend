import classes from "./add-new.module.scss";
import Button from "~/src/shared/ui/button";
import classNames from "classnames";

interface Props {
  onClick: () => void;
  disabled: boolean;
  productsLength: number;
}

export default function AddNewProductButton({
  onClick,
  disabled,
  productsLength,
}: Props) {
  return (
    <Button
      typeButton="yellow"
      onClick={onClick}
      className={classNames(classes.container, {
        [classes.long]: productsLength > 0,
      })}
      disabled={disabled}
    >
      <span className="heading h7 text-yellow-1000">Добавить товар</span>
    </Button>
  );
}
