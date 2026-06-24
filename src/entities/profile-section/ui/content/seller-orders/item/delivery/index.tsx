import classes from "./delivery.module.scss";
import SellerOrderInfoContainer from "../info-container";
import {
  getSellerOrderColor,
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
  const colors = getSellerOrderColor(status_code);

  return (
    <SellerOrderInfoContainer
      className={`flex-column ${classes.container}`}
      borderColor={colors.infoBorder}
    >
      <h4 className={`heading h7 text-${colors.text}`}>Служба доставки</h4>
      <p
        className={`${classes.item} text-body l text-${colors.text}`}
        style={
          {
            "--color": colors.textHex,
          } as React.CSSProperties
        }
      >
        {delivery_method}
      </p>
    </SellerOrderInfoContainer>
  );
}
