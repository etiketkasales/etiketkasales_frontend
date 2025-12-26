import Button from "~/src/shared/ui/button";
import classes from "./button.module.scss";

interface Props {
  onClick: () => void | Promise<void>;
}

export default function PickupPointInfoButton({ onClick }: Props) {
  return (
    <Button
      typeButton="yellow"
      onClick={onClick}
      className={classes.button}
      radius={12}
    >
      <span className="heading h7">Выбрать этот пункт</span>
    </Button>
  );
}
