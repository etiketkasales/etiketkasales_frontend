import classes from "./bottom.module.scss";
import StringUtils from "~/src/shared/lib/utils/string.util";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import {
  SellerProductStatusCode,
  sellerProductStatusColors,
} from "~/src/entities/profile-section/model";

interface Props {
  price: string;
  name: string;
  status: string;
  status_code: SellerProductStatusCode;
  slug: string;
  id: number;
}

export default function ProfileProductBottom({
  price,
  name,
  status,
  status_code,
  slug,
  id,
}: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <p className="heading h6 text-neutral-600 nowrap-text">
        {StringUtils.formatPrice(price)} ₽
      </p>
      <LinkContainer
        link={`/etiketka/${slug}/${id}`}
        className={`heading h7 text-neutral-900 ${classes.webkitBox}`}
      >
        {name}
      </LinkContainer>
      <p
        className={`heading h7 text-${sellerProductStatusColors[status_code]} ${classes.webkitBox}`}
      >
        {status}
      </p>
    </div>
  );
}
