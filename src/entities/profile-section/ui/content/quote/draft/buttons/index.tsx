import React, { CSSProperties } from "react";

import classes from "./buttons.module.scss";
import { QuoteStageType } from "~/src/entities/profile-section/model";
import Button from "~/src/shared/ui/button";

interface Props {
  setPrevStage: () => void;
  onSave: () => Promise<void>;
  needBackButton: boolean;
  stageNumber: number;
  loading: boolean;
}

interface IButton {
  title: string;
  onClick: () => void | Promise<void>;
  type: "yellow" | "gray-border";
  forBack: boolean;
  order: number;
}

const stagesCount = 3;

export default function QuoteButtons({
  setPrevStage,
  onSave,
  needBackButton,
  stageNumber,
  loading,
}: Props) {
  const buttons: IButton[] = [
    {
      title:
        stageNumber === stagesCount ? "Согласиться и отправить" : "Продолжить",
      onClick: async () => await onSave(),
      type: "yellow",
      forBack: false,
      order: 1,
    },
    {
      title: "Назад",
      onClick: setPrevStage,
      type: "gray-border",
      forBack: true,
      order: 0,
    },
  ];

  return (
    <div className={`flex ${classes.container}`}>
      <span className="text-body xs text-neutral-700">
        {stageNumber} из {stagesCount}
      </span>
      <div className="flex-row gap-3 align-center">
        {buttons.map((item) => {
          const key = `quote-button-${item.forBack ? "back" : "save"}`;
          if (item.forBack && !needBackButton) return null;
          return (
            <Button
              key={key}
              typeButton={item.type}
              onClick={item.onClick}
              className={classes.button}
              disabled={loading}
              radius={12}
              style={
                {
                  "--order": item.order,
                } as CSSProperties
              }
            >
              <span className="heading h7">{item.title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
