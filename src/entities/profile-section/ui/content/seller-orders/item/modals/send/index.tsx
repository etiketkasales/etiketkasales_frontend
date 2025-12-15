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
}

export default function OrderSendModal({ onClose, isOpen, orderId }: Props) {
  const { loading, error, onInputChange, onSubmit, formData } = useOrderSend({
    orderId,
    closeModal: onClose,
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
      loading={loading}
      title="Отклонить заказ?"
      buttons={buttons}
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={`flex-column ${classes.inputs}`}>
        {sendOrderModalInputs.map((item, index) => (
          <TextInput
            key={`${index}-${item.field}`}
            value={formData?.[item.field] || ""}
            placeholder={item.placeholder}
            errorText={error?.field === item.field ? error.message : ""}
            onChange={(e) => onInputChange(e.target.value, item.field)}
            name={`etiketka-${item.field}`}
            autoComplete={"off"}
          />
        ))}
      </div>
    </OrderBaseModal>
  );
}
