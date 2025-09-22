"use client";
import React from "react";
import { useRouter } from "next/navigation";

import classes from "./header.module.scss";
import LeftArrow from "~/public/form-modal/arrow-left-short.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  text: string;
  subText?: string;
  onBackClick?: () => void;
}

export default function FormModalHeader({ text, subText, onBackClick }: Props) {
  const { push } = useRouter();
  const buttonClick = () => {
    if (window.location.href.includes("company/registrate")) {
      push("/for-bussiness");
    } else {
      history.back();
    }
  };

  return (
    <div className={`flex-row gap-5 center-element ${classes.container}`}>
      <Button
        typeButton={"ghost"}
        size="0"
        onClick={() => {
          if (onBackClick) {
            onBackClick();
          } else {
            buttonClick();
          }
        }}
        className={`${classes.subheader} ${classes.button}`}
      >
        <LeftArrow />
      </Button>
      <p className="black text-20 bold second-family text-center">{text}</p>
      {subText && (
        <p
          className={`${classes.subheader} ${classes.right_subheader} gray-2 text-16 second-family semibold`}
        >
          {subText}
        </p>
      )}
    </div>
  );
}
