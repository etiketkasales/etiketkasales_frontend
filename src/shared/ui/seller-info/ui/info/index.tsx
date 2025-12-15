import classNames from "classnames";

import classes from "./info.module.scss";
import Arrow from "~/public/seller-info/chevron-compact-right.svg";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import SellerInfoText from "./text";
import { ISellerInfo } from "~/src/shared/ui/seller-info/model";

interface Props extends ISellerInfo {
  className?: string;
}

export default function SellerInfoDetails({
  shop_name: name,
  reviews_count: reviews,
  rating,
  avatar,
  className,
}: Props) {
  return (
    <div
      className={classNames(
        className,
        "flex-row align-center",
        classes.container,
      )}
    >
      <div className="flex-row align-center">
        <ImageWrapper
          src={avatar}
          width={44}
          height={44}
          className={classes.image}
        />
        <SellerInfoText name={name} reviews={reviews} rating={rating} />
      </div>
      <Arrow />
    </div>
  );
}
