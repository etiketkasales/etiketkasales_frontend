import { useState } from "react";

import classes from "./order-content.module.scss";
import OrderInfo from "./info";
import OrderStatus from "./status";
import OrderBillUrl from "./bill-link";
import OrderPayUrl from "./pay-link";

interface Props {
  created_at: string;
  order_number: string;
  order_id: number;
  status: string;
  status_code?: string;
  payment_method?: string | null;
  company_id?: number | null;
  comment: string;
  bill_url?: string | null;
  track_number?: string | null;
  tracking_url?: string | null;
}

function canRetryPayment(
  statusCode?: string,
  paymentMethod?: string | null,
): boolean {
  if (statusCode === "pending_payment") {
    return paymentMethod !== "invoice";
  }

  return false;
}

export default function OrderContent({
  created_at,
  order_number,
  order_id,
  status,
  status_code,
  payment_method,
  company_id,
  bill_url,
  comment,
  track_number,
  tracking_url,
}: Props) {
  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const invoiceIssued =
    status_code === "awaiting_invoice_payment" || invoiceConfirmed;
  const showPayButton = canRetryPayment(status_code, payment_method);
  const showInvoicePayButton =
    payment_method === "invoice" &&
    status_code === "pending_payment" &&
    !invoiceIssued;
  const showInvoiceDownload =
    payment_method === "invoice" && !!bill_url && invoiceIssued;

  return (
    <div className={`flex-column ${classes.container}`}>
      <OrderInfo created_at={created_at} order_number={order_number} />
      <OrderStatus
        status={status}
        comment={comment}
        track_number={track_number}
        tracking_url={tracking_url}
      />
      {(showPayButton || showInvoicePayButton) && (
        <OrderPayUrl
          orderId={order_id}
          paymentMethod={payment_method}
          companyId={company_id}
          onInvoiceSuccess={() => setInvoiceConfirmed(true)}
        />
      )}
      {showInvoiceDownload && (
        <OrderBillUrl orderId={order_id} orderNumber={order_number} />
      )}
    </div>
  );
}
