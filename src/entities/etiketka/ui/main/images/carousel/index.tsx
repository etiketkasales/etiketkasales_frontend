"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useWindowSize } from "react-use";

import classes from "./carousel.module.scss";
import ImageContainer from "~/src/shared/ui/image-container";
import Button from "~/src/shared/ui/button";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

interface Props {
  images_urls: string[];
  currentImage: string;
  setCurrentImage: Dispatch<SetStateAction<string>>;
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
  loaded: boolean;
}

export default function ImagesCarousel({
  images_urls,
  currentImage,
  setCurrentImage,
  setPreviewImage,
  loaded,
}: Props) {
  const { width } = useWindowSize();
  const skeletons = Array(6).fill("");

  return (
    <div
      className={`flex-row gap-2 align-center scrollbar ${classes.container}`}
    >
      {loaded
        ? images_urls.map((src, index) => {
            return (
              <Button
                key={index}
                typeButton="ghost"
                size="0"
                needActiveScale={false}
                radius={width <= 768 ? 20 : 16}
                onClick={() => setCurrentImage(src)}
                onMouseEnter={() => setPreviewImage(src)}
                onMouseLeave={() => setPreviewImage(null)}
              >
                <ImageContainer
                  src={src}
                  width={100}
                  height={100}
                  radius={width <= 768 ? 20 : 16}
                  fixedSize
                  className={`${currentImage === src ? classes.current : ""}`}
                />
              </Button>
            );
          })
        : skeletons.map((_, index) => {
            return <SkeletonWrapper key={index} className={classes.skeleton} />;
          })}
    </div>
  );
}
