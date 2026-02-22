import { useLogout } from "~/src/features/login/lib/hooks";
import classes from "./change-button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onSave: () => void;
  disabled: boolean;
}

export default function ProfileSaveButton({ onSave, disabled }: Props) {
  const { handleLogout } = useLogout();
  return (
    <Button
      typeButton="yellow"
      size="16-24"
      onClick={handleLogout}
      disabled={disabled}
      className={classes.container}
      radius={12}
    >
      <span className="text-yellow-1000 heading h7">Сохранить</span>
    </Button>
  );
}
