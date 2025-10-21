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
}

export default function ImageWrapper({
  width,
  height,
  src = "/shared/image-src-plug.png",
  className,
  imgClassName,
  alt = "",
  loading,
  children = null,
  fill,
  priority,
}: Props) {
  const { canLoad } = useImageWrapper({ src });

  return (
    <div className={classNames(className, classes.container)}>
      <Image
        src={canLoad ? src : "/shared/image-src-plug.png"}
        width={width}
        height={height}
        alt={alt}
        className={imgClassName}
        loading={loading}
        priority={priority}
        fill={fill}
      />
      {children}
    </div>
  );
}
