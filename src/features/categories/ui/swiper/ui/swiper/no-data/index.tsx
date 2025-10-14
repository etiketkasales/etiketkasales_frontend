import React from "react";

import classes from "./no-data.module.scss";

export default function CategoriesSwiperNoData() {
  return (
    <div className={classes.container}>
      <p className="heading h6 neutral-700">Нет интернета</p>
    </div>
  );
}
