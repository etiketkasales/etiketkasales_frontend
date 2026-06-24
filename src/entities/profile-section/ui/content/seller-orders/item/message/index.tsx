import SellerOrderInfoContainer from "../info-container";
import {
  getSellerOrderColor,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  message: string;
  status_code: SellerOrderStatusCode;
}

export default function OrderMessage({ message, status_code }: Props) {
  const colors = getSellerOrderColor(status_code);

  return (
    <SellerOrderInfoContainer
      borderColor={colors.infoBorder}
      className={`flex-column gap-3`}
    >
      <p className={`text-body l text-${colors.text}`}>{message}</p>
    </SellerOrderInfoContainer>
  );
}
