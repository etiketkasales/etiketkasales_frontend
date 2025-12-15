import OrderRejectModal from "./reject";

import { OrderModalType } from "~/src/entities/profile-section/model";
import OrderSendModal from "./send";

interface Props {
  modalType: OrderModalType | null;
  orderId: number;
  onClose: () => void;
}

export default function OrderModalSwitcher({
  modalType,
  orderId,
  onClose,
}: Props) {
  switch (modalType) {
    case "reject":
      return (
        <OrderRejectModal
          isOpen={modalType === "reject"}
          onClose={onClose}
          orderId={orderId}
        />
      );
    case "send":
      return (
        <OrderSendModal
          isOpen={modalType === "send"}
          onClose={onClose}
          orderId={orderId}
        />
      );
    default:
      return null;
  }
}
