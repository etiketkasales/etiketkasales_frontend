"use client";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function EtiketkaMainContainer({ children, className }: Props) {
  return (
    <section className={`white-container radius-20 ${className}`}>
      {children}
    </section>
  );
}
