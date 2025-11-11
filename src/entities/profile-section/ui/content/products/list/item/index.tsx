import React from "react";

import classes from "./product.module.scss";
import ProfileProductTop from "./top";
import ProfileProductBottom from "./bottom";
import { ISellerProduct } from "~/src/entities/profile-section/model";

interface Props extends ISellerProduct {
  openProductModal: (id: number) => void;
}

export default function ProfileProduct({
  id,
  image,
  openProductModal,
  ...rest
}: Props) {
  return (
    <li className={`flex-column ${classes.container}`}>
      <ProfileProductTop
        image={image}
        onButtonClick={() => openProductModal(id)}
      />
      <ProfileProductBottom {...rest} />
    </li>
  );
}
