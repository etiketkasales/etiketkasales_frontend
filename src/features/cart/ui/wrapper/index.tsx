"use client";
import React from "react";
import Container from "~/src/shared/ui/container/ui";

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
    <Container
      className={`padding-${padding} radius-20 ${className}`}
      style={{
        width: "100%",
        maxWidth: maxWidth ? `${maxWidth}px` : "unset",
      }}
    >
      {children}
    </Container>
  );
}
