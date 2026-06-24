import classes from "./item.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import {
  ISellerOrderProduct,
  getSellerOrderColor,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props extends ISellerOrderProduct {
  status_code: SellerOrderStatusCode;
}

export default function OrderProductsItem({ image, name, status_code }: Props) {
  const colors = getSellerOrderColor(status_code);

  return (
    <div className="flex-row gap-3 align-center">
      <ImageWrapper
        src={image}
        width={24}
        height={24}
        alt=""
        className={classes.image}
      />
      <p className={`text-body l text-${colors.text}`}>{name}</p>
    </div>
  );
}
