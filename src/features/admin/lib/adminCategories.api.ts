import { apiClient } from "~/src/shared/lib/api/client.api";
import type { ITreeCategory } from "~/src/features/categories/model";

export type AdminCategory = {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  sort_order: number;
  is_active: number | boolean;
  children?: AdminCategory[];
};

export async function getAdminCategoriesTree(): Promise<AdminCategory[]> {
  const { data } = await apiClient.get<{
    success: boolean;
    data?: AdminCategory[];
  }>("/admin/categories/tree");
  if (!data.success || !data.data) {
    throw new Error("Не удалось загрузить категории");
  }
  return data.data;
}

export async function getAdminCategory(id: number): Promise<AdminCategory> {
  const { data } = await apiClient.get<{
    success: boolean;
    data?: AdminCategory;
    message?: string;
  }>(`/admin/categories/${id}`);
  if (!data.success || !data.data) {
    throw new Error(data.message ?? "Категория не найдена");
  }
  return data.data;
}

export async function createAdminCategory(payload: {
  name: string;
  description?: string | null;
  parent_id?: number | null;
  image?: string | null;
  sort_order?: number;
  is_active?: boolean;
}): Promise<AdminCategory> {
  const { data } = await apiClient.post<{
    success: boolean;
    data?: AdminCategory;
    message?: string;
  }>("/admin/categories", payload);
  if (!data.success || !data.data) {
    throw new Error(data.message ?? "Ошибка создания");
  }
  return data.data;
}

export async function updateAdminCategory(
  id: number,
  payload: Record<string, unknown>,
): Promise<AdminCategory> {
  const { data } = await apiClient.put<{
    success: boolean;
    data?: AdminCategory;
    message?: string;
  }>(`/admin/categories/${id}`, payload);
  if (!data.success || !data.data) {
    throw new Error(data.message ?? "Ошибка сохранения");
  }
  return data.data;
}

export async function deleteAdminCategory(id: number): Promise<void> {
  const { data } = await apiClient.delete<{
    success: boolean;
    message?: string;
  }>(`/admin/categories/${id}`);
  if (!data.success) {
    throw new Error(data.message ?? "Ошибка удаления");
  }
}

export async function uploadCategoryImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("image", file);
  const { data } = await apiClient.post<{
    success: boolean;
    data?: { url?: string };
    message?: string;
  }>("/upload/category-image", fd);
  if (!data.success || !data.data?.url) {
    throw new Error(data.message ?? "Ошибка загрузки");
  }
  return data.data.url;
}

/** Плоский список для TreeSelect (все узлы). */
export function flattenCategoryTree(
  nodes: AdminCategory[] | ITreeCategory[],
): Array<{ id: number; name: string; depth: number }> {
  const out: Array<{ id: number; name: string; depth: number }> = [];
  const walk = (list: AdminCategory[] | ITreeCategory[], depth: number) => {
    for (const n of list) {
      out.push({ id: n.id, name: n.name, depth });
      const kids =
        (n as AdminCategory).children ?? (n as ITreeCategory).children;
      if (kids?.length) {
        walk(kids, depth + 1);
      }
    }
  };
  walk(nodes, 0);
  return out;
}
