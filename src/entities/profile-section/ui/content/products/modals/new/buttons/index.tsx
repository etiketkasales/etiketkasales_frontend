import classNames from "classnames";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  modalStage: number;
  onNext: () => Promise<void>;
  onPrev: () => void;
}

interface IButton {
  title: string;
  type: "white" | "yellow";
  onClick: () => void;
}

export default function NewProductModalButtons({
  modalStage,
  onNext,
  onPrev,
}: Props) {
  const buttons: IButton[] = [
    {
      title: "Продолжить",
      type: "yellow",
      onClick: async () => await onNext(),
    },
    {
      title: "Назад",
      type: "white",
      onClick: onPrev,
    },
  ];

  return (
    <div className={`flex-row align-center gap-8 ${classes.container}`}>
      <p className={`text-body xs text-neutral-700`}>{modalStage} из 2</p>
      <div className="flex-row gap-3 align-center">
        {buttons.map((item, index) => {
          const color = `text-${item.type === "yellow" ? "yellow-1000" : "neutral-800"}`;
          if (item.type === "white" && modalStage === 1) return null;
          return (
            <Button
              key={`${index}-${item.title}`}
              typeButton={item.type}
              onClick={item.onClick}
              className={classNames(classes.button, {
                [classes.yellow]: item.type === "yellow",
              })}
            >
              <span className={`heading h7 ${color}`}>{item.title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
