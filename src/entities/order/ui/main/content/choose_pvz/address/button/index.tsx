import classes from "./button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
  disabled: boolean;
  hasAddress: boolean;
}

export default function OrderAddressButton({
  onClick,
  disabled,
  hasAddress,
}: Props) {
  return (
    <Button
      typeButton={hasAddress ? "gray" : "yellow"}
      onClick={onClick}
      radius={12}
      size="12"
      className={classes.container}
      disabled={disabled}
    >
      {hasAddress ? (
        <span className="text-body xl">Сменить адрес</span>
      ) : (
        <span className="heaing h7 text-yellow-1000">Добавить адрес</span>
      )}
    </Button>
  );
}
