import React from "react";

import classes from "./load-button.module.scss";
import ImageIcon from "~/public/profile/products/image.svg";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function ProductModalLoadButton({ onClick, disabled }: Props) {
  return (
    <div
      className={`flex-column align-center gap-10px pointer ${classes.container}`}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      <ImageIcon />
      <p className="text-body l text-yellow-600 text-center">
        Добавить изображение
        <br />
        (в формате 1:1)
      </p>
    </div>
  );
}
