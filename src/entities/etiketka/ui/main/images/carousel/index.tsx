import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

import classes from "./carousel.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

interface Props {
  images_urls: string[];
  currentImage: string;
  setCurrentImage: Dispatch<SetStateAction<string>>;
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
}

export default function ImagesCarousel({
  images_urls,
  currentImage,
  setCurrentImage,
  setPreviewImage,
}: Props) {
  return (
    <div
      className={`flex-row gap-2 align-center scrollbar ${classes.container}`}
    >
      {images_urls.map((src, index) => {
        return (
          <ImageWrapper
            key={index + src}
            src={src}
            width={100}
            height={100}
            className={classNames("pointer", classes.imageContainer, {
              [classes.current]: currentImage === src,
            })}
            onClick={() => setCurrentImage(src)}
            onMouseEnter={() => setPreviewImage(src)}
            onMouseLeave={() => setPreviewImage(null)}
          />
        );
      })}
    </div>
  );
}
