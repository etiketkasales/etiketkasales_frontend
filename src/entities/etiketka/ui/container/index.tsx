"use client";
import React from "react";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function EtiketkaMainContainer({ children, className }: Props) {
  return (
    <Container bgColor={"neutral-100"} className={`radius-20 ${className}`}>
      {children}
    </Container>
  );
}
