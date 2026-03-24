import StringUtils from "~/src/shared/lib/utils/string.util";
import { ICartItem } from "../../model";

/** Строковые id/количества из API, безопасные числа для корзины */
export function normalizeProductId(value: unknown): number {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n > 0 ? n : NaN;
}

export function normalizeMinOrderQuantity(value: unknown): number {
  const n = Math.floor(Number(value));
  if (Number.isFinite(n) && n >= 1) return n;
  return 1;
}

export function normalizeLineQuantity(value: unknown): number {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export const getCartTotalQuantity = (
  items: ICartItem[] | null | undefined,
): number =>
  (items ?? []).reduce(
    (sum, item) => sum + Math.max(0, Number(item.quantity) || 0),
    0,
  );

export const configureNewItem = (item: ICartItem) => {
  const numPrice = StringUtils.formatPriceToNumber(item.price);
  if (!numPrice) return null;

  return {
    product_id: item.product_id,
    product_name: item.name,
    quantity: item.quantity,
    price: numPrice,
  };
};
