"use client";

import { useCallback, useState } from "react";
import { apiClient } from "~/src/shared/lib/api";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import classes from "./bill-link.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  orderId: number;
  orderNumber: string;
}

export default function OrderBillUrl({ orderId, orderNumber }: Props) {
  const createNotification = useCreateNotification();
  const [loading, setLoading] = useState(false);

  const onDownload = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await apiClient.get(`/users/orders/${orderId}/invoice`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `schet-${orderNumber || orderId}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      createNotification("Не удалось скачать счёт", "error");
    } finally {
      setLoading(false);
    }
  }, [createNotification, loading, orderId, orderNumber]);

  return (
    <Container
      bgColor={"yellow-500"}
      as="button"
      type="button"
      onClick={onDownload}
      disabled={loading}
      className={classes.container}
    >
      <span className="heading h7 text-yellow-1000">
        {loading ? "Загрузка..." : "Скачать счет"}
      </span>
    </Container>
  );
}
