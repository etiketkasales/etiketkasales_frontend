import { useOrderOperation } from ".";

import {
  IRejectOrderForm,
  orderOperationDataMap,
} from "~/src/entities/profile-section/model";

interface Props {
  orderId: number;
  closeModal: () => void;
}

const type = "reject";

export const useOrderReject = ({ orderId, closeModal }: Props) => {
  const initialData = orderOperationDataMap[type] as IRejectOrderForm;

  const returnData = useOrderOperation({
    type,
    initialData,
    orderId,
    closeModal,
  });

  return returnData;
};
