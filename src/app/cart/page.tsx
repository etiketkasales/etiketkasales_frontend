import { Metadata } from "next";
import CartPage from "~/src/pages-components/cart/ui";

export const metadata: Metadata = {
  description: "Корзина товаров на EtiketkaSales",
};

export default function Page() {
  return <CartPage />;
}
