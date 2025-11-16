import OrderPage from "~/src/pages-components/order";

import { OrderType } from "../../store/reducers/order.slice";

interface Props {
  params: Promise<{ type: OrderType }>;
}

export default async function Page({ params }: Props) {
  const { type } = await params;
  return <OrderPage type={type} />;
}
