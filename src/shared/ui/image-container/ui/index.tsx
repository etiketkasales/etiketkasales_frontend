"use client";
import React from "react";
import classNames from "classnames";
import { useImageContainer } from "~/src/shared/ui/image-container/lib/hooks/useImageContainer.hook";

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
  children?: React.ReactNode;
  priority?: boolean;
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
    children,
    ...rest
  } = props;

  const { getRadius, canLoad } = useImageContainer({
    radius,
    src,
  });

  return (
    <div
      style={{
        maxWidth: !fixedSize ? `${width}px` : undefined,
        maxHeight: !fixedSize ? `${height}px` : undefined,
        borderRadius: `${getRadius()}`,
        height: fixedSize ? `${height}px` : "auto",
        width: fixedSize ? `${width}px` : "100%",
      }}
      className={classNames(classes.container, className)}
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
      {children}
    </div>
  );
}
