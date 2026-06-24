import { useOrderSend } from "~/src/entities/profile-section/lib/hooks";

import classes from "./send.module.scss";
import OrderBaseModal from "../base";
import TextInput from "~/src/shared/ui/inputs/text-input";
import {
  IOrderModalButton,
  sendOrderModalInputs,
} from "~/src/entities/profile-section/model";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  orderId: number;
  initialTrackNumber?: string | null;
}

export default function OrderSendModal({
  onClose,
  isOpen,
  orderId,
  initialTrackNumber,
}: Props) {
  const {
    loading,
    error,
    onInputChange,
    onSubmit,
    formData,
    cdekHint,
    syncingCdek,
  } = useOrderSend({
    orderId,
    closeModal: onClose,
    isOpen,
    initialTrackNumber,
  });

  const buttons: IOrderModalButton[] = [
    {
      title: "Назад",
      type: "gray-border",
      onClick: onClose,
    },
    {
      title: "Подтвердить",
      type: "yellow",
      onClick: onSubmit,
    },
  ];

  return (
    <OrderBaseModal
      loading={loading || syncingCdek}
      title="Отметить как отправлен"
      buttons={buttons}
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={`flex-column ${classes.inputs}`}>
        {cdekHint && <p className="text-body m text-neutral-700">{cdekHint}</p>}
        {sendOrderModalInputs.map((item, index) => (
          <TextInput
            key={`${index}-${item.field}`}
            value={formData?.[item.field] || ""}
            placeholder={
              item.field === "track_number"
                ? "Трек-номер (подставится из СДЭК)"
                : item.placeholder
            }
            errorText={error?.field === item.field ? error.message : ""}
            onChange={(e) => onInputChange(e.target.value, item.field)}
            name={`etiketka-${item.field}`}
            autoComplete={"off"}
            readOnly={
              item.field === "track_number" && Boolean(formData?.track_number)
            }
          />
        ))}
      </div>
    </OrderBaseModal>
  );
}
