import React from "react";

import classes from "./image.module.scss";
import NoSrcImage from "./no-src";
import Image from "next/image";

export type ImageRadiusT = 24 | 16 | 20 | 12 | "50%";

interface Props {
  width: number;
  height: number;
  src: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
  loading?: "lazy" | "eager";
  radius?: ImageRadiusT;
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
    radius,
    fixedSize,
    ...rest
  } = props;

  const getRadius = () => {
    if (!radius) return "unset";

    if (typeof radius === "number") {
      return `${radius}px`;
    }
    return radius;
  };

  return (
    <div
      style={{
        maxWidth: !fixedSize ? `${width}px` : "",
        maxHeight: !fixedSize ? `${height}px` : "",
        borderRadius: getRadius(),
        height: fixedSize ? `${height}px` : "auto",
        width: fixedSize ? `${width}px` : "100%",
      }}
      className={`${className} ${classes.container}`}
    >
      {src ? (
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
