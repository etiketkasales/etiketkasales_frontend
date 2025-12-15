"use client";
import React, { useState } from "react";
import classNames from "classnames";

import classes from "./order.module.scss";
import Container from "~/src/shared/ui/container/ui";
import SellerOrderHeading from "./heading";
import SellerOrderBuyer from "./buyer";
import SellerOrderProducts from "./products";
import SellerOrderDownloadButton from "./button/download";
import SellerOrderConfirmationButton from "./button/confirmation";
import SellerOrderDelivery from "./delivery";
import {
  ISellerOrder,
  OrderModalType,
  sellerOrderColors,
} from "~/src/entities/profile-section/model";
import OrderModalSwitcher from "./modals";
import SellerOrderNeedConfirmButton from "./button/need_confirm";
import OrderTrackNumber from "./track";
import OrderMessage from "./message";

interface Props extends ISellerOrder {}

export default function SellerOrder({
  id,
  order_number,
  created_at,
  total_amount,
  status,
  status_code,
  invoice_url,
  products,
  buyer,
  act_file_url,
  track_number,
  delivery_method,
  readiness_message,
  message,
}: Props) {
  const [modalType, setModalType] = useState<OrderModalType | null>(null);

  return (
    <Container
      as="li"
      bgColor={sellerOrderColors[status_code].bg}
      className={classNames(classes.container, "flex-column")}
      style={
        {
          "--border-color": sellerOrderColors[status_code].border,
        } as React.CSSProperties
      }
    >
      <SellerOrderHeading
        status={status}
        total_amount={total_amount}
        created_at={created_at}
        order_number={order_number}
        status_code={status_code}
        readiness_message={readiness_message}
      />
      {delivery_method && (
        <SellerOrderDelivery
          delivery_method={delivery_method}
          status_code={status_code}
        />
      )}
      {buyer && <SellerOrderBuyer {...buyer} status_code={status_code} />}
      {track_number && (
        <OrderTrackNumber number={track_number} status_code={status_code} />
      )}
      {message && <OrderMessage message={message} status_code={status_code} />}
      {Array.isArray(products) && products.length > 0 && (
        <SellerOrderProducts products={products} status_code={status_code} />
      )}
      {(invoice_url || act_file_url) && (
        <SellerOrderDownloadButton
          invoice_url={invoice_url}
          act_url={act_file_url}
        />
      )}
      {status_code === "need_confirm" && (
        <SellerOrderNeedConfirmButton
          orderId={id}
          setModalType={setModalType}
        />
      )}
      {status_code === "processing" && (
        <SellerOrderConfirmationButton
          onConfirm={() => setModalType("send")}
          onCancel={() => setModalType("reject")}
          confirmText="Отметить как отправлен"
        />
      )}
      <OrderModalSwitcher
        modalType={modalType}
        orderId={id}
        onClose={() => setModalType("")}
      />
    </Container>
  );
}
