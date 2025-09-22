"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  padding: string;
  gap: number | string;
  radius?: number;
  color?: string;
  forRow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// TO DO: убрать этот контейнер из компонентов

export default function ContainerShared({
  children,
  radius = 20,
  padding,
  color = "white",
  gap,
  forRow = false,
  className,
  style,
}: Props) {
  return (
    <div
      className={`${color}-container radius-${radius} padding-${padding} gap-${gap} ${className} ${forRow ? "flex-row" : "flex-column"}`}
      style={style}
    >
      {children}
    </div>
  );
}
