import NewSellerProductModal from "./new";
import EditSellerProductModal from "./edit";
import {
  ISellerProduct,
  ISellerProductsModal,
} from "~/src/entities/profile-section/model";
import { Dispatch, SetStateAction } from "react";

interface Props {
  onClose: () => void;
  modal: ISellerProductsModal;
  title: string;
  editProductId: number;
  products: ISellerProduct[];
  setSellerProducts: Dispatch<SetStateAction<ISellerProduct[]>>;
}

export default function SellerProductModal({
  onClose,
  title,
  modal,
  editProductId,
  products,
  setSellerProducts,
}: Props) {
  switch (modal.type) {
    case "new":
      return (
        <NewSellerProductModal
          isActive={modal.active!}
          onClose={onClose}
          title={title}
          setSellerProducts={setSellerProducts}
        />
      );
    case "edit":
      const editProduct = products.find((item) => item.id === editProductId);
      if (!editProduct) return null;
      return (
        <EditSellerProductModal
          isActive={modal.active!}
          onClose={onClose}
          title={title}
          productData={editProduct}
          setSellerProducts={setSellerProducts}
        />
      );
  }
}
