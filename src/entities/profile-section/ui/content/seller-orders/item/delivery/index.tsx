import classes from "./delivery.module.scss";
import SellerOrderInfoContainer from "../info-container";
import {
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  delivery_method: string;
  status_code: SellerOrderStatusCode;
}

// TO DO: вынести в компонент: Контейнер с заголовком, отдельно контейнер со списком
export default function SellerOrderDelivery({
  delivery_method,
  status_code,
}: Props) {
  return (
    <SellerOrderInfoContainer
      className={`flex-column ${classes.container}`}
      borderColor={sellerOrderColors[status_code].infoBorder}
    >
      <h4 className={`heading h7 text-${sellerOrderColors[status_code].text}`}>
        Служба доставки
      </h4>
      <p
        className={`${classes.item} text-body l text-${sellerOrderColors[status_code].text}`}
        style={
          {
            "--color": sellerOrderColors[status_code].textHex,
          } as React.CSSProperties
        }
      >
        {delivery_method}
      </p>
    </SellerOrderInfoContainer>
  );
}
