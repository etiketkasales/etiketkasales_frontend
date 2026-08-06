import { apiClient } from "~/src/shared/lib/api/client.api";

export type BannerPlacement = "HOME_HERO" | "HOME_SMALL";

export type PublicBanner = {
  id: string;
  desktopImageUrl: string;
  mobileImageUrl: string | null;
  targetUrl: string | null;
  altText: string | null;
};

export type ActiveBannersResponse = Partial<
  Record<BannerPlacement, PublicBanner[]>
>;

export async function fetchActiveBanners(
  placements: BannerPlacement[],
): Promise<ActiveBannersResponse> {
  const res = await apiClient.get<{
    success: boolean;
    data?: ActiveBannersResponse;
  }>("/banners/active", {
    params: { placements: placements.join(",") },
    skipAuth: true,
  });
  return res.data.data ?? {};
}
