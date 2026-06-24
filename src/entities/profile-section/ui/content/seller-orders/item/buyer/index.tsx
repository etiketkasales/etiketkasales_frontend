import classes from "./buyer.module.scss";
import SellerOrderInfoContainer from "../info-container";
import BuyerInfo from "./info";
import {
  ISellerOrderBuyer,
  getSellerOrderColor,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props extends ISellerOrderBuyer {
  status_code: SellerOrderStatusCode;
}

export default function SellerOrderBuyer(props: Props) {
  const colors = getSellerOrderColor(props.status_code);

  return (
    <SellerOrderInfoContainer
      className={`flex-column ${classes.container}`}
      borderColor={colors.infoBorder}
    >
      <h4 className={`heading h7 text-${colors.text}`}>Покупатель</h4>
      <BuyerInfo {...props} />
    </SellerOrderInfoContainer>
  );
}
