import classNames from "classnames";

import classes from "./orders-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import OrderContent from "./content";
import OrderExtra from "./extra";
import { IOrder } from "~/src/entities/profile-section/model";

interface Props extends IOrder {}

export default function ProfileOrdersItem({
  id,
  created_at,
  order_number,
  total_amount,
  status,
  status_code,
  payment_method,
  company_id,
  comment,
  preview_image,
  invoice_url,
  track_number,
  tracking_url,
}: Props) {
  return (
    <Container
      as="li"
      bgColor={"neutral-300"}
      className={classNames(classes.container, "flex")}
    >
      <OrderContent
        order_id={id}
        created_at={created_at}
        order_number={order_number}
        status={status}
        status_code={status_code}
        payment_method={payment_method}
        company_id={company_id}
        bill_url={invoice_url}
        comment={comment}
        track_number={track_number}
        tracking_url={tracking_url}
      />
      <OrderExtra total_amount={total_amount} previewImage={preview_image} />
    </Container>
  );
}
