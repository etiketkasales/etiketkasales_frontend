"use client";
import { useState } from "react";
import { useSellerProducts } from "~/src/entities/profile-section/lib/hooks";

import classes from "./products.module.scss";
import ProfileContentContainer from "../container";
import AddNewProductButton from "./add-new";
import ProfileProductsList from "./list";
import Loader from "~/src/shared/ui/loader";
import SellerProductModal from "./modals";
import {
  ISellerProduct,
  ISellerProductsModal,
  modalTitles,
  profileTitlesMap,
} from "~/src/entities/profile-section/model";
import ProductImagesEditor from "~/src/entities/product-images-editor/ui";

interface Props {}

export default function ProfileProducts({}: Props) {
  const [sellerProducts, setSellerProducts] = useState<ISellerProduct[]>([]);
  const { loading, editProductId, setEditProductId } = useSellerProducts({
    needLoad: true,
    setSellerProducts,
  });
  const [modal, setModal] = useState<ISellerProductsModal>({
    active: null,
    type: "new",
  });

  return (
    <ProfileContentContainer
      title={profileTitlesMap.products}
      className={`flex-column ${classes.container}`}
    >
      {loading ? (
        <Loader radius={20} className={classes.loader} />
      ) : (
        <ProfileProductsList
          products={sellerProducts}
          setModalId={(n) => setEditProductId(n)}
          setModalActive={() =>
            setModal({
              active: true,
              type: "edit",
            })
          }
        />
      )}
      <AddNewProductButton
        onClick={() =>
          setModal({
            type: "new",
            active: true,
          })
        }
        disabled={false}
        productsLength={sellerProducts?.length || 0}
      />
      {modal.active !== null && (
        <SellerProductModal
          modal={modal}
          onClose={() => setModal((prev) => ({ ...prev, active: false }))}
          title={modalTitles[modal.type] || ""}
          editProductId={editProductId}
          products={sellerProducts}
          setSellerProducts={setSellerProducts}
        />
      )}
    </ProfileContentContainer>
  );
}
