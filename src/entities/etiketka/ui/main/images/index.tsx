"use client";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./images.module.scss";
import ImagesCarousel from "./carousel";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import EtiketkaImagesPrice from "./price";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

interface Props {
  images_urls: string[];
  price: string;
  old_price?: string;
}

export default function EtiketkaImages({
  images_urls,
  price,
  old_price,
}: Props) {
  const { width } = useWindowSize();
  const { loaded } = useAppSelector(selectNavigation);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!images_urls) return;
    setCurrentImage(images_urls[0]);
  }, [images_urls]);

  return (
    <EtiketkaMainContainer
      className={`flex-column gap-2 padding-8 ${classes.container}`}
    >
      {loaded ? (
        currentImage && (
          <ImageWrapper
            src={previewImage ?? currentImage}
            width={width > 1100 ? 468 : 350}
            height={width > 1100 ? 468 : 350}
            alt=""
            className={`${classes.image}`}
          />
        )
      ) : (
        <SkeletonWrapper className={classes.image_skeleton} />
      )}
      <ImagesCarousel
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        images_urls={images_urls}
        loaded={loaded}
      />
      {width <= 768 && (
        <EtiketkaImagesPrice price={price} old_price={old_price} />
      )}
    </EtiketkaMainContainer>
  );
}
