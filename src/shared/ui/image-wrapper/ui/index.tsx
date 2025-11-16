import React from "react";
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
}: Props) {
  const { canLoad } = useImageWrapper({ src });

  return (
    <div className={classNames(className, classes.container)}>
      {!needDummy && (!canLoad || !src) ? null : (
        <Image
          src={canLoad ? (src ? src : fallbackImage) : fallbackImage}
          width={width}
          height={height}
          alt={alt}
          className={imgClassName}
          loading={loading}
          priority={priority}
          fill={fill}
        />
      )}
      {children}
    </div>
  );
}
