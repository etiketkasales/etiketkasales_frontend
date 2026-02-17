import classes from "./buyer.module.scss";
import SellerOrderInfoContainer from "../info-container";
import BuyerInfo from "./info";
import {
  ISellerOrderBuyer,
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props extends ISellerOrderBuyer {
  status_code: SellerOrderStatusCode;
}

export default function SellerOrderBuyer(props: Props) {
  return (
    <SellerOrderInfoContainer
      className={`flex-column ${classes.container}`}
      borderColor={sellerOrderColors[props.status_code].infoBorder}
    >
      <h4
        className={`heading h7 text-${sellerOrderColors[props.status_code].text}`}
      >
        Покупатель
      </h4>
      <BuyerInfo {...props} />
    </SellerOrderInfoContainer>
  );
}
