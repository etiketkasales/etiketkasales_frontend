"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import { syncOrderPaymentStatus } from "~/src/entities/order/lib/api";
import {
  ensureAccessToken,
  hasValidAccessToken,
} from "~/src/shared/lib/api/authRefreshLock";
import Loader from "~/src/shared/ui/loader";
import Container from "~/src/shared/ui/container/ui";

import classes from "./success.module.scss";
import OrderSuccessHeading from "./heading";
import OrderSuccessButtons from "./buttons";

export default function OrderSuccessPageClient() {
  const searchParams = useSearchParams();
  const [syncing, setSyncing] = useState(true);
  const [paid, setPaid] = useState<boolean | null>(null);

  const paymentMode = searchParams.get("payment");
  const isInvoicePayment = paymentMode === "invoice";

  const orderId = useMemo(() => {
    const fromQuery = searchParams.get("order_id");
    if (fromQuery && /^\d+$/.test(fromQuery)) {
      return Number(fromQuery);
    }

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("pending_payment_order_id");
      if (stored && /^\d+$/.test(stored)) {
        return Number(stored);
      }
    }

    return null;
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (isInvoicePayment) {
        setPaid(null);
        setSyncing(false);
        return;
      }

      if (!orderId) {
        setSyncing(false);
        return;
      }

      if (!hasValidAccessToken()) {
        await ensureAccessToken();
      }

      if (!hasValidAccessToken()) {
        setSyncing(false);
        return;
      }

      try {
        const res = await syncOrderPaymentStatus(orderId);
        if (!cancelled) {
          setPaid(Boolean(res?.data?.paid));
        }
      } catch {
        if (!cancelled) {
          setPaid(null);
        }
      } finally {
        if (!cancelled) {
          sessionStorage.removeItem("pending_payment_order_id");
          setSyncing(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [orderId, isInvoicePayment]);

  return (
    <PageWrapper>
      <Container className={`flex-column ${classes.container}`}>
        {syncing && (
          <div className={classes.loader}>
            <Loader radius={24} />
            <p className="text-body m text-neutral-700">
              {isInvoicePayment
                ? "Оформляем заказ…"
                : "Проверяем статус оплаты…"}
            </p>
          </div>
        )}

        {!syncing && !isInvoicePayment && paid === false && (
          <p className={`text-body m text-neutral-700 ${classes.notice}`}>
            Оплата ещё обрабатывается. Статус заказа обновится в личном кабинете
            через несколько минут.
          </p>
        )}

        {!syncing && (
          <OrderSuccessHeading
            isInvoicePayment={isInvoicePayment}
            orderId={orderId}
          />
        )}
        {!syncing && (
          <OrderSuccessButtons
            isInvoicePayment={isInvoicePayment}
            orderId={orderId}
          />
        )}
      </Container>
    </PageWrapper>
  );
}
