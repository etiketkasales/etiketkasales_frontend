"use client";
import React from "react";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  children: React.ReactNode;
  padding: string;
  className?: string;
}

export default function ProfileWrapper({
  children,
  padding,
  className,
}: Props) {
  return (
    <Container
      bgColor={"neutral-100"}
      className={`white-container radius-20 padding-${padding} ${className}`}
    >
      {children}
    </Container>
  );
}
