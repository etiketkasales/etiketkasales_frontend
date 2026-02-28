import StringUtils from "~/src/shared/lib/utils/string.util";
import { ICartItem } from "../../model";

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
