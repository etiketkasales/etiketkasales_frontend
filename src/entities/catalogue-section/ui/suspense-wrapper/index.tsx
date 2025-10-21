"use client";
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export default function CatalogueSuspenseWrapper({
  children,
  fallback,
}: Props) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
