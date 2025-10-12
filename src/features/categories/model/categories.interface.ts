import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";

export interface ICategory {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  description: string;
  image: string;
  sort_order: number;
  is_active: 1 | 0;
}

export interface ITreeCategory {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  children: ITreeCategory[];
}

export interface IGetRandomCategories {
  category: ICategory;
  products: IEtiketka[];
}
