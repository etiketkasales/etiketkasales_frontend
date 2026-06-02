"use client";

import { useCallback, useState } from "react";
import { createOrderPayment } from "~/src/entities/order/lib/api";
import { navigateToOrderPayment } from "~/src/entities/order/lib/navigateToOrderPayment";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import classes from "./pay-link.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  orderId: number;
  paymentMethod?: string | null;
  companyId?: number | null;
  onInvoiceSuccess?: () => void;
}

function resolveOnlinePaymentMethod(paymentMethod?: string | null): string {
  if (paymentMethod === "sbp" || paymentMethod === "card_online") {
    return paymentMethod;
  }

  return "card_online";
}

export default function OrderPayUrl({
  orderId,
  paymentMethod,
  companyId,
  onInvoiceSuccess,
}: Props) {
  const createNotification = useCreateNotification();
  const [loading, setLoading] = useState(false);
  const isInvoice = paymentMethod === "invoice";

  const onPay = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await createOrderPayment(orderId, {
        payment_method: isInvoice
          ? "invoice"
          : resolveOnlinePaymentMethod(paymentMethod),
        company_id:
          isInvoice && companyId && companyId > 0 ? companyId : undefined,
      });

      if (!res) {
        createNotification("Не удалось перейти к оплате", "error");
        return;
      }

      if (res.invoice) {
        onInvoiceSuccess?.();
      }

      if (navigateToOrderPayment(res, orderId)) {
        return;
      }

      createNotification("Не удалось получить ссылку на оплату", "error");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Не удалось перейти к оплате";
      createNotification(message, "error");
    } finally {
      setLoading(false);
    }
  }, [
    createNotification,
    loading,
    orderId,
    paymentMethod,
    companyId,
    isInvoice,
    onInvoiceSuccess,
  ]);

  const buttonLabel = isInvoice
    ? loading
      ? "Оформляем..."
      : "Оформить оплату по счёту"
    : loading
      ? "Загрузка..."
      : "Оплатить заказ";

  return (
    <Container
      bgColor={"yellow-500"}
      as="button"
      type="button"
      onClick={onPay}
      disabled={loading}
      className={classes.container}
    >
      <span className="heading h7 text-yellow-1000">{buttonLabel}</span>
    </Container>
  );
}
