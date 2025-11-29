"use client";
import React, { useEffect, useState } from "react";

import classes from "./images.module.scss";
import ImagesCarousel from "./carousel";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import EtiketkaImagesPrice from "./price";
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
      <ImageWrapper
        src={previewImage ?? currentImage}
        width={468}
        height={468}
        alt=""
        className={`${classes.image}`}
      />
      <ImagesCarousel
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        images_urls={images_urls}
      />
      <EtiketkaImagesPrice price={price} old_price={old_price} />
    </EtiketkaMainContainer>
  );
}
