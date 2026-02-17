import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onClose: () => void;
  onSave: () => void;
  disabled: boolean;
}

interface IButton {
  title: string;
  onClick: () => void;
  type: "yellow" | "white";
  textColor: string;
}

export default function AddCompanyButtons({
  onClose,
  onSave,
  disabled,
}: Props) {
  const buttons: IButton[] = [
    {
      title: "Добавить",
      onClick: onSave,
      type: "yellow",
      textColor: "yellow-1000",
    },
    {
      title: "Отмена",
      onClick: onClose,
      type: "white",
      textColor: "neutral-800",
    },
  ];

  return (
    <div className="flex-row align-center gap-3">
      {buttons.map((item, index) => (
        <Button
          key={`${item.title}-${index}`}
          typeButton={item.type}
          onClick={item.onClick}
          disabled={disabled && item.type === "yellow"}
          className={classes.button}
          style={
            {
              "--order": item.type === "yellow" ? 1 : 0,
            } as React.CSSProperties
          }
          radius={12}
        >
          <span className={`heading h7 text-${item.textColor}`}>
            {item.title}
          </span>
        </Button>
      ))}
    </div>
  );
}
