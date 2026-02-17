import StringUtils from "~/src/shared/lib/utils/string.util";

import SellerOrderInfoContainer from "../info-container";
import OrderProductsItem from "./item";
import {
  ISellerOrderProduct,
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  products: ISellerOrderProduct[];
  status_code: SellerOrderStatusCode;
}

export default function SellerOrderProducts({ products, status_code }: Props) {
  return (
    <SellerOrderInfoContainer
      borderColor={sellerOrderColors[status_code].infoBorder}
      className={`flex-column gap-3`}
    >
      <h4 className={`heading h7 text-${sellerOrderColors[status_code].text}`}>
        {StringUtils.pluralizeWords(
          ["товар", "товара", "товаров"],
          products.length,
        )}
      </h4>
      <div className="flex-column gap-2">
        {products.map((product, index) => (
          <OrderProductsItem
            key={`${product.name}-${index}`}
            image={product.image}
            name={product.name}
            status_code={status_code}
          />
        ))}
      </div>
    </SellerOrderInfoContainer>
  );
}
