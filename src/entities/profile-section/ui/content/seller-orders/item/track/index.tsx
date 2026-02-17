import SellerOrderInfoContainer from "../info-container";
import {
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  number: string;
  status_code: SellerOrderStatusCode;
}

export default function OrderTrackNumber({ number, status_code }: Props) {
  return (
    <SellerOrderInfoContainer
      borderColor={sellerOrderColors[status_code].infoBorder}
      className={`flex-column gap-3`}
    >
      <h4 className={`heading h7 `}>Трек-номер</h4>
      <p className={`text-body l text-${sellerOrderColors[status_code].text}`}>
        {number}
      </p>
    </SellerOrderInfoContainer>
  );
}
