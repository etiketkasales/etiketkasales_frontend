"use client";
import React from "react";

import classes from "./entity.module.scss";
import X from "~/public/profile/x-circle.svg";
import Dot from "~/public/profile/dot.svg";
import { ProfileLegalEntityI } from "~/src/entities/profile-section/model/profile.interface";
import Button from "~/src/shared/ui/button";

interface Props {
  entity: ProfileLegalEntityI;
}

interface ItemI {
  title: string;
  value: number;
}

export default function ProfileAsLegalEntity({ entity }: Props) {
  const info: ItemI[] = [
    {
      title: "ИНН",
      value: entity.inn,
    },
    {
      title: "ОГРН",
      value: entity.ogrn,
    },
    {
      title: "КПП",
      value: entity.kpp,
    },
  ];
  return (
    <div
      className={`gap-6 flex-row align-center space-between relative ${classes.container}`}
    >
      <div className="flex-column gap-3">
        <h2 className="text-22 second-family black semibold">{entity.title}</h2>
        <p className="text-18 black regular second-family">{entity.adress}</p>
        <ul className="flex-row gap-1 align-center">
          {info.map((item, index) => {
            return (
              <li key={index} className="flex-row gap-1 align-center relative">
                {index !== 0 && (
                  <Dot
                    style={{
                      maxWidth: "22px",
                      maxHeight: "22px",
                    }}
                  />
                )}
                <Button
                  typeButton="ghost"
                  size="0"
                  onClick={() => {
                    navigator.clipboard.writeText(item.value.toString());
                  }}
                  title="Нажмите, чтобы скопировать"
                >
                  <p className="text-16 gray-2 second-family regular">
                    {item.title}: {""}
                    {item.value}
                  </p>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {}}
        className={classes.button}
      >
        <X style={{ maxWidth: "26px", maxHeight: "26px" }} />
      </Button>
    </div>
  );
}
