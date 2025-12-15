import { useOrderOperation } from ".";

import {
  ISendOrderForm,
  orderOperationDataMap,
} from "~/src/entities/profile-section/model";

interface Props {
  orderId: number;
  closeModal: () => void;
}

const type = "send";

export const useOrderSend = ({ orderId, closeModal }: Props) => {
  const initialData = orderOperationDataMap[type] as ISendOrderForm;

  const returnData = useOrderOperation({
    type,
    initialData,
    orderId,
    closeModal,
  });

  return returnData;
};
