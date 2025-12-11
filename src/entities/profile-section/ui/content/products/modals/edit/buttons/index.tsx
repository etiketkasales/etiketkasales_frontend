import React, { CSSProperties } from "react";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onSave: () => Promise<void>;
  toArchive: () => Promise<void>;
  onDelete: () => Promise<void>;
  disableSave: boolean;
  loading: boolean;
}

interface IButton {
  title: string;
  type: "gray-border" | "yellow-border" | "yellow";
  onClick: () => void;
  order: number;
}

export default function EditProductsModalButtons({
  onSave,
  toArchive,
  onDelete,
  disableSave,
  loading,
}: Props) {
  const buttons: IButton[] = [
    {
      title: "Редактировать карточку",
      type: "yellow",
      onClick: onSave,
      order: 1,
    },
    {
      title: "В архив",
      type: "gray-border",
      onClick: toArchive,
      order: 0,
    },
    {
      title: "Удалить",
      type: "yellow-border",
      onClick: onDelete,
      order: 1,
    },
  ];

  const lastButton = buttons[buttons.length - 1];

  return (
    <div className={`flex ${classes.container} ${classes.wrapper}`}>
      <Button
        typeButton={lastButton.type}
        onClick={lastButton.onClick}
        className={`${classes.button} ${classes.delete}`}
        style={
          {
            "--order": lastButton.order,
          } as CSSProperties
        }
      >
        <span className="heading h7">{lastButton.title}</span>
      </Button>
      <div className={`flex ${classes.container}`}>
        {buttons.slice(0, 2).map((item, index) => (
          <Button
            key={`${index}-${item.title}`}
            typeButton={item.type}
            onClick={item.onClick}
            className={classes.button}
            style={
              {
                "--order": item.order,
              } as CSSProperties
            }
            disabled={(item.order === 1 && disableSave) || loading}
          >
            <span className="heading h7">{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
