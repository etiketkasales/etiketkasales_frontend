import classes from "./confirmation.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  confirmText: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  disabled?: boolean;
}

export default function SellerOrderConfirmationButton({
  confirmText,
  onConfirm,
  onCancel,
  disabled,
}: Props) {
  return (
    <div className={`flex gap-4 ${classes.container}`}>
      <Button
        typeButton="yellow"
        onClick={onConfirm}
        radius={12}
        className={classes.confirm}
        disabled={disabled}
      >
        <span className="heading h7 text-yellow-1000">{confirmText}</span>
      </Button>
      <Button
        typeButton="white"
        onClick={onCancel}
        radius={12}
        className={classes.cancel}
        disabled={disabled}
      >
        <span className="heading h7 text-neutral-800">Отклонить</span>
      </Button>
    </div>
  );
}
