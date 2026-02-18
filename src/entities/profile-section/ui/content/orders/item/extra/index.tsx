import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import classes from "./order-extra.module.scss";
import OrderPrice from "./price";

interface Props {
  total_amount: string;
  previewImage?: string;
  images?: string[];
}

export default function OrderExtra({ total_amount, previewImage }: Props) {
  return (
    <div className={`flex ${classes.container}`}>
      <OrderPrice price={total_amount} />
      {previewImage && (
        <ImageWrapper
          width={70}
          height={70}
          src={previewImage}
          alt=""
          className={classes.image}
        />
      )}
    </div>
  );
}
