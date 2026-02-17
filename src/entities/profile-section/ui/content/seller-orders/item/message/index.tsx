import SellerOrderInfoContainer from "../info-container";
import {
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  message: string;
  status_code: SellerOrderStatusCode;
}

export default function OrderMessage({ message, status_code }: Props) {
  return (
    <SellerOrderInfoContainer
      borderColor={sellerOrderColors[status_code].infoBorder}
      className={`flex-column gap-3`}
    >
      <p className={`text-body l text-${sellerOrderColors[status_code].text}`}>
        {message}
      </p>
    </SellerOrderInfoContainer>
  );
}
