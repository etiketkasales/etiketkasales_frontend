import React from "react";

import classes from "./add-button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
  loading: boolean;
}

export default function AddCompanyButton({ onClick, loading }: Props) {
  return (
    <Button
      typeButton="yellow"
      onClick={onClick}
      className={classes.container}
      radius={12}
      disabled={loading}
    >
      <span className="heading h7 text-yellow-1000">Добавить организацию</span>
    </Button>
  );
}
