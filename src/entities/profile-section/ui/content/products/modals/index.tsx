import React from "react";

import NewSellerProductModal from "./new";
import { ISellerProduct } from "~/src/entities/profile-section/model";
import EditSellerProductModal from "./edit";

interface Props {
  onClose: () => void;
  type: "new" | "edit";
  title: string;
  editProductId: number;
  products: ISellerProduct[];
}

export default function SellerProductModal({
  onClose,
  title,
  type,
  editProductId,
  products,
}: Props) {
  switch (type) {
    case "new":
      return (
        <NewSellerProductModal
          isActive={type === "new"}
          onClose={onClose}
          title={title}
        />
      );
    case "edit":
      const editProduct = products.find((item) => item.id === editProductId);
      if (!editProduct) return null;
      return (
        <EditSellerProductModal
          isActive={type === "edit"}
          onClose={onClose}
          title={title}
          productData={editProduct}
        />
      );
  }
}
