import { useEffect, useState } from "react";
import { useOrderOperation } from ".";
import { syncSellerOrderCdek } from "~/src/entities/profile-section/lib/api";

import {
  ISendOrderForm,
  orderOperationDataMap,
} from "~/src/entities/profile-section/model";

interface Props {
  orderId: number;
  closeModal: () => void;
  isOpen: boolean;
  initialTrackNumber?: string | null;
}

const type = "send";

export const useOrderSend = ({
  orderId,
  closeModal,
  isOpen,
  initialTrackNumber,
}: Props) => {
  const initialData = orderOperationDataMap[type] as ISendOrderForm;
  const [cdekHint, setCdekHint] = useState<string | null>(null);
  const [syncingCdek, setSyncingCdek] = useState(false);

  const returnData = useOrderOperation({
    type,
    initialData: {
      ...initialData,
      track_number: initialTrackNumber?.trim() || "",
    },
    orderId,
    closeModal,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;
    const loadCdek = async () => {
      setSyncingCdek(true);
      setCdekHint(null);
      try {
        const data = await syncSellerOrderCdek(orderId);
        if (cancelled || !data) {
          return;
        }

        const track =
          data.cdek?.has_real_waybill && data.cdek?.cdek_number
            ? data.cdek.cdek_number
            : data.order?.track_number &&
                !String(data.order.track_number).match(/^ETK/i)
              ? data.order.track_number
              : "";

        if (track) {
          returnData.onInputChange(track, "track_number");
          setCdekHint("Трек-номер накладной СДЭК получен");
        } else if (data.cdek?.register_error) {
          setCdekHint(data.cdek.register_error);
        } else if (
          data.verification?.exists_in_cdek &&
          !data.verification?.has_real_waybill
        ) {
          setCdekHint(
            "Заказ есть в СДЭК, но накладная ещё не выдана. Подождите или нажмите повторную регистрацию.",
          );
        } else if (data.message) {
          setCdekHint(data.message);
        } else {
          setCdekHint(
            "Номер накладной ещё не готов. Подождите минуту и откройте снова.",
          );
        }
      } finally {
        if (!cancelled) {
          setSyncingCdek(false);
        }
      }
    };

    void loadCdek();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, orderId]);

  return {
    ...returnData,
    cdekHint,
    syncingCdek,
  };
};
