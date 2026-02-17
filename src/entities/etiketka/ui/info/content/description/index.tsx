"use client";

import classes from "./description.module.scss";

interface Props {
  description: string;
}

export default function EtiketkaInfoDescription({ description }: Props) {
  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <h2 className="text-18 black second-family semibold">Описание товара</h2>
      <p className="gray-2 text-16 second-family regular">{description}</p>
    </div>
  );
}
