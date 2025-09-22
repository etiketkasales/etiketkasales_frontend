"use client";
import React from "react";
import { CurrentIndexI } from "~/src/entities/etiketka/model/etiketka.interface";
import EtiketkaInfoDescription from "./description";

interface Props {
  currentIndex: CurrentIndexI;
}

export default function EtiketkaInfoContent({ currentIndex }: Props) {
  switch (currentIndex) {
    default:
    case "descr":
      return <EtiketkaInfoDescription />;
  }
}
