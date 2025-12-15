import { useOrderReject } from "~/src/entities/profile-section/lib/hooks";

import OrderBaseModal from "../base";
import TextInput from "~/src/shared/ui/inputs/text-input";
import { IOrderModalButton } from "~/src/entities/profile-section/model";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  orderId: number;
}

const inputField = "rejectReason";

export default function OrderRejectModal({ onClose, isOpen, orderId }: Props) {
  const { loading, error, onInputChange, onSubmit, formData } = useOrderReject({
    orderId,
    closeModal: onClose,
  });

  const buttons: IOrderModalButton[] = [
    {
      title: "Назад",
      type: "yellow",
      onClick: onClose,
    },
    {
      title: "Отклонить",
      type: "red-border",
      onClick: onSubmit,
    },
  ];

  return (
    <OrderBaseModal
      loading={loading}
      title="Отклонить заказ?"
      buttons={buttons}
      isActive={isOpen}
      onClose={onClose}
    >
      <TextInput
        onChange={(e) => onInputChange(e.target.value, inputField)}
        value={formData?.[inputField] || ""}
        placeholder="Напишите причину отказа"
        errorText={error && error.field === inputField ? error.message : ""}
      />
    </OrderBaseModal>
  );
}
