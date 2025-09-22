"use client";
import React from "react";

import classes from "./heading.module.scss";
import Plus from "~/public/profile/plus-circle.svg";
import Button from "~/src/shared/ui/button";

export default function ProfileAsLegalHeading() {
  return (
    <div className="flex-row space-between">
      <h1 className="black text-28 bold second-family">
        Покупать как юр. лицо
      </h1>
      <Button
        typeButton="bg-gray"
        size="6-10"
        radius={12}
        className={`${classes.button}`}
      >
        <div className="flex-row gap-1 align-center">
          <Plus style={{ maxWidth: "22px", maxHeight: "22px" }} />
          <span className="gray-2 second-family regular text-16">
            Добавить организацию
          </span>
        </div>
      </Button>
    </div>
  );
}
