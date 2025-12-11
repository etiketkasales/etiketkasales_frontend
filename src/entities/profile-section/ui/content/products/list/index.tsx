import React from "react";

import classes from "./products-list.module.scss";
import ProfileProduct from "./item";
import { ISellerProduct } from "~/src/entities/profile-section/model";

interface Props {
  products: ISellerProduct[];
  setModalId: (n: number) => void;
  setModalActive: () => void;
}

export default function ProfileProductsList({
  products,
  setModalId,
  setModalActive,
}: Props) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-body xl text-neutral-800">Товары не добавлены</p>;
  }

  return (
    <ul className={`${classes.container}`}>
      {products.map((item, index) => (
        <ProfileProduct
          key={`${item.slug}-${index}`}
          openProductModal={(id) => setModalId(id)}
          setModalActive={setModalActive}
          {...item}
        />
      ))}
    </ul>
  );
}
