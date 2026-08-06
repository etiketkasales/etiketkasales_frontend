import { useCallback, useEffect, useState } from "react";
import {
  fetchActiveBanners,
  type BannerPlacement,
  type PublicBanner,
} from "~/src/shared/ui/advs/lib/api/banners.api";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";

function mapBanner(b: PublicBanner): IAdv {
  return {
    id: String(b.id),
    link: b.targetUrl?.trim() || "",
    image_url: b.desktopImageUrl,
    mobile_image_url: b.mobileImageUrl,
    alt: b.altText?.trim() || "Рекламный баннер",
  };
}

export const useAdvs = (placement: BannerPlacement) => {
  const [advs, setAdvs] = useState<IAdv[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleGetAdvs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchActiveBanners([placement]);
      setAdvs((data[placement] ?? []).map(mapBanner));
    } catch (e) {
      console.error(e);
      setAdvs([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [placement]);

  useEffect(() => {
    void handleGetAdvs();
  }, [handleGetAdvs]);

  return {
    advs,
    loading,
    error,
    handleGetAdvs,
  };
};
