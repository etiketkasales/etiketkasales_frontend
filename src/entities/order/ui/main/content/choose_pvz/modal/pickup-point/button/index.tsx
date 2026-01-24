import Button from "~/src/shared/ui/button";
import classes from "./pickup-point-button.module.scss";

interface Props {
  onClick: () => void;
}

export default function PickupPointButton({ onClick }: Props) {
  return (
    <Button typeButton="yellow" onClick={onClick} className={classes.button}>
      <span className="heading h7">Выбрать этот пункт</span>
    </Button>
  );
}
