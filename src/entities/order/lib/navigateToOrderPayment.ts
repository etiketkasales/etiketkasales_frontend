import { ICreatePaymentDto } from "../model";

/** Редирект после POST /orders/{id}/payment/ (карта, СБП или счёт). */
export function navigateToOrderPayment(
  res: ICreatePaymentDto,
  orderId: number,
): boolean {
  if (res.payment_url) {
    sessionStorage.setItem("pending_payment_order_id", String(orderId));
    window.location.href = res.payment_url;
    return true;
  }

  if (res.invoice) {
    const target =
      res.redirect_url || `/order/success?order_id=${orderId}&payment=invoice`;
    window.location.href = target;
    return true;
  }

  return false;
}
