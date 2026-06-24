import SellerOrderInfoContainer from "../info-container";
import {
  getSellerOrderColor,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  number: string;
  status_code: SellerOrderStatusCode;
}

export default function OrderTrackNumber({ number, status_code }: Props) {
  const colors = getSellerOrderColor(status_code);

  return (
    <SellerOrderInfoContainer
      borderColor={colors.infoBorder}
      className={`flex-column gap-3`}
    >
      <h4 className={`heading h7 `}>Трек-номер</h4>
      <p className={`text-body l text-${colors.text}`}>{number}</p>
    </SellerOrderInfoContainer>
  );
}
