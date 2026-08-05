"use client";

import { useWindowSize } from "react-use";
import classes from "./slide.module.scss";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";
import { useBannerImageSrc } from "~/src/shared/ui/advs/lib/hooks/useBannerImageSrc.hook";

interface Props extends IAdv {}

export default function AdvsSlide({
  image_url,
  mobile_image_url,
  link,
  alt,
}: Props) {
  const { width } = useWindowSize();
  const src = useBannerImageSrc({ image_url, mobile_image_url });

  const image = (
    <ImageWrapper
      src={src || "/adv/no-add-banner.png"}
      width={1240}
      height={width <= 420 ? 200 : 464}
      alt={alt || "Рекламный баннер"}
      className={classes.image}
      priority
    />
  );

  if (!link) {
    return <div className={classes.image}>{image}</div>;
  }

  return (
    <LinkContainer
      link={link}
      target={
        link.startsWith("http://") || link.startsWith("https://")
          ? "_blank"
          : undefined
      }
    >
      {image}
    </LinkContainer>
  );
}
