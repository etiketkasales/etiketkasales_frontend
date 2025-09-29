"use client";
import React, { CSSProperties } from "react";

import classes from "./form-modal.module.scss";
import FormModalHeader from "./header";
import Button from "~/src/shared/ui/button";
import FormModalInputs from "./inputs";
import Container from "~/src/shared/ui/container/ui";
import { FormModalInputI } from "../model/form-modal.interface";
import { MessageI } from "~/src/shared/model/shared.interface";

interface Props<T> {
  formData: T;
  inputs: FormModalInputI<T>[];
  inputsHeaderText: string;
  onInputChange: (v: string, field: keyof T) => void;
  onButtonClick: () => void;
  headerText: string;
  gap: string;
  error: MessageI | null;
  maxHeight?: number;
  minHeight?: number;
  subHeader?: string;
  buttonText?: string;
  onBackButtonClick?: () => void;
  children?: React.ReactNode;
  padding?: string;
}

export default function FormModal<T>({
  formData,
  inputs,
  inputsHeaderText,
  onInputChange,
  onButtonClick,
  gap,
  headerText,
  error,
  subHeader,
  buttonText = "Продолжить",
  children,
  maxHeight,
  minHeight,
  padding = "20",
  onBackButtonClick,
}: Props<T>) {
  return (
    <Container
      className={classes.container}
      style={
        {
          maxHeight: maxHeight ? `${maxHeight}px ` : "unset",
          minHeight: minHeight ? `${minHeight}px ` : "unset",
          "--padding": `${padding}px`,
          "--gap": `${gap}px`,
        } as CSSProperties
      }
    >
      <FormModalHeader
        text={headerText}
        subText={subHeader}
        onBackClick={onBackButtonClick}
      />
      {inputs.length > 0 && (
        <FormModalInputs
          formData={formData}
          inputs={inputs}
          headerText={inputsHeaderText}
          onChange={onInputChange}
          error={error}
        />
      )}
      {children}
      <Button
        typeButton="yellow"
        size="12"
        radius={12}
        onClick={() => onButtonClick()}
      >
        <span className="text-16 second-family black semibold">
          {buttonText}
        </span>
      </Button>
    </Container>
  );
}
