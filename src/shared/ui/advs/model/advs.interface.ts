export type BannerPlacement = "HOME_HERO" | "HOME_SMALL";

export interface IAdv {
  id: string;
  link: string;
  image_url: string;
  mobile_image_url?: string | null;
  alt?: string;
}
