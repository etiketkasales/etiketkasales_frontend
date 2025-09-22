"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  maxWidth?: number;
}

export default function CartWrapper({
  children,
  padding = "20",
  className,
  maxWidth,
}: Props) {
  return (
    <div
      className={`padding-${padding} white-container radius-20 ${className}`}
      style={{
        width: "100%",
        maxWidth: maxWidth ? `${maxWidth}px` : "unset",
      }}
    >
      {children}
    </div>
  );
}
