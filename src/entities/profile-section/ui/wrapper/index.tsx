"use client";
import React from "react";

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
    <div
      className={`white-container radius-20 padding-${padding} ${className}`}
    >
      {children}
    </div>
  );
}
