"use client";
import React from "react";
import { useImageContainer } from "../lib/hooks/useImageContainer.hook";

import classes from "./image.module.scss";
import NoSrcImage from "./no-src";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
  src: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
  loading?: "lazy" | "eager";
  radius?: string | number;
  fixedSize?: boolean;
}

export default function ImageContainer(props: Props) {
  const {
    width,
    height,
    src,
    className,
    imgClassName,
    alt,
    loading,
    radius = 0,
    fixedSize,
    ...rest
  } = props;

  const { getRadius, canLoad } = useImageContainer({
    radius,
    src,
  });

  return (
    <div
      style={{
        maxWidth: !fixedSize ? `${width}px` : "",
        maxHeight: !fixedSize ? `${height}px` : "",
        borderRadius: `${getRadius()}`,
        height: fixedSize ? `${height}px` : "auto",
        width: fixedSize ? `${width}px` : "100%",
      }}
      className={`${className} ${classes.container}`}
    >
      {canLoad ? (
        <Image
          src={src}
          width={width}
          height={height}
          loading={loading}
          {...rest}
          alt={alt ?? " "}
          className={imgClassName}
          decoding="async"
        />
      ) : (
        <NoSrcImage width={width} height={height} radius={getRadius()} />
      )}
    </div>
  );
}
