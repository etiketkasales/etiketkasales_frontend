"use client";
import { useRef } from "react";
import classNames from "classnames";

interface Props<T> {
  markers: T[];
  wrapperClassName?: string;
  mapClassName?: string;
}

export default function YandexMap<T>({
  markers,
  wrapperClassName,
  mapClassName,
}: Props<T>) {
  const mapRef = useRef<HTMLDivElement>(null);

  return <div className={classNames("relative", wrapperClassName)}></div>;
}
