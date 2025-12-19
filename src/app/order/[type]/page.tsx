import OrderTypedPage from "~/src/pages-components/order/type";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  params: Promise<{ type: OrderType }>;
}

export default async function Page({ params }: Props) {
  const { type } = await params;
  return <OrderTypedPage type={type} />;
}
