import { IAdv } from "./advs.interface";

const defaultImage = "/adv/no-add-banner.png";

/** Плейсхолдеры только для скелетона загрузки — не показывать как реальные баннеры. */
export const advsSkeleton: IAdv[] = [
  { id: "sk-1", link: "", image_url: defaultImage },
  { id: "sk-2", link: "", image_url: defaultImage },
  { id: "sk-3", link: "", image_url: defaultImage },
];
