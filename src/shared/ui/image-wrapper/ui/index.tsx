import React, { CSSProperties } from "react";
import classNames from "classnames";
import { useImageWrapper } from "../lib/hooks/useImageWrapper.hook";

import classes from "./image-wrapper.module.scss";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
  src: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
  loading?: "lazy" | "eager";
  children?: React.ReactNode;
  priority?: boolean;
  fill?: boolean;
  needDummy?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

const fallbackImage = "/shared/image-src-plug.png";

export default function ImageWrapper({
  width,
  height,
  src = fallbackImage,
  className,
  imgClassName,
  alt = "",
  loading = "lazy",
  children = null,
  fill,
  priority,
  needDummy = true,
  onClick,
  style,
}: Props) {
  const { canLoad } = useImageWrapper({ src });

  return (
    <div
      className={classNames(className, classes.container)}
      onClick={onClick}
      style={style}
    >
      {!needDummy && (!canLoad || !src) ? null : (
        <Image
          src={canLoad ? (src ? src : fallbackImage) : fallbackImage}
          width={width}
          height={height}
          alt={alt}
          className={imgClassName}
          loading={priority ? "eager" : loading}
          priority={priority}
          fill={fill}
        />
      )}
      {children}
    </div>
  );
}
