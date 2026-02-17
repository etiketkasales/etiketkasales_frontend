"use client";

import classes from "./header.module.scss";
import ArrowLeft from "~/public/login/arrow-left-short.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  title: string;
}

export default function LoginHeader({ title }: Props) {
  return (
    <div className={`relative place-center ${classes.container}`}>
      <Button
        typeButton={"ghost"}
        size="0"
        onClick={() => {
          history.back();
        }}
        className={classes.back_button}
      >
        <ArrowLeft />
      </Button>
      <h1 className={`black text-20 bold second-family ${classes.title}`}>
        {title}
      </h1>
    </div>
  );
}
