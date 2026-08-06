"use client";

import { useWindowSize } from "react-use";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";

/** На узком экране — mobileImage, иначе desktop; fallback на desktop. */
export function useBannerImageSrc(
  item: Pick<IAdv, "image_url" | "mobile_image_url">,
) {
  const { width } = useWindowSize();
  const isMobile = Number.isFinite(width) && width > 0 && width <= 768;
  if (isMobile && item.mobile_image_url) {
    return item.mobile_image_url;
  }
  return item.image_url;
}
