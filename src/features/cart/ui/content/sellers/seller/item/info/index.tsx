import classes from "./seller-item.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import Link from "next/link";
import SellerItemDouble from "../actions/double";
import Price from "~/src/shared/ui/price/ui";

interface Props {
  image: string;
  name: string;
  deleteFromCart: () => Promise<void>;
  price: string;
  old_price: string | null;
  slug: string;
  id: number;
}

export default function CartSellerItemInfo({
  image,
  name,
  deleteFromCart,
  price,
  old_price,
  slug,
  id,
}: Props) {
  return (
    <div className={`flex-row ${classes.container}`}>
      <ImageWrapper
        src={image}
        alt={""}
        className={classes.image}
        width={120}
        height={120}
      />
      <div className={`flex-column ${classes.innerContainer}`}>
        <Link
          href={`/etiketka/${slug}/${id}`}
          rel="noopener norefferrer"
          target="_blank"
          className={`heading h6 text-neutral-1000 ${classes.link}`}
        >
          {name}
        </Link>
        <SellerItemDouble
          deleteFromCart={deleteFromCart}
          containerClassName={classes.double}
        />
        <Price old_price={old_price} price={price} className={classes.price} />
      </div>
    </div>
  );
}
