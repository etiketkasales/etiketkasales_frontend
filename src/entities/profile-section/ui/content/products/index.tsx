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
  SellerProductStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {}

export default function ProfileProducts({}: Props) {
  const [sellerProducts, setSellerProducts] = useState<ISellerProduct[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    "all" | SellerProductStatusCode
  >("all");
  const { loading, editProductId, setEditProductId } = useSellerProducts({
    needLoad: true,
    setSellerProducts,
  });
  const [modal, setModal] = useState<ISellerProductsModal>({
    active: null,
    type: "new",
  });
  const filteredProducts =
    statusFilter === "all"
      ? sellerProducts
      : sellerProducts.filter((p) => p.status_code === statusFilter);

  return (
    <ProfileContentContainer
      title={profileTitlesMap.products}
      className={`flex-column ${classes.container}`}
    >
      <div className={`flex-row gap-3 ${classes.filters}`}>
        <button
          type="button"
          className={`${classes.filterBtn} ${statusFilter === "all" ? classes.filterBtnActive : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          Все
        </button>
        <button
          type="button"
          className={`${classes.filterBtn} ${statusFilter === "draft" ? classes.filterBtnActive : ""}`}
          onClick={() => setStatusFilter("draft")}
        >
          Черновики
        </button>
        <button
          type="button"
          className={`${classes.filterBtn} ${statusFilter === "pending" ? classes.filterBtnActive : ""}`}
          onClick={() => setStatusFilter("pending")}
        >
          На модерации
        </button>
        <button
          type="button"
          className={`${classes.filterBtn} ${statusFilter === "approved" ? classes.filterBtnActive : ""}`}
          onClick={() => setStatusFilter("approved")}
        >
          Опубликованные
        </button>
      </div>
      {loading ? (
        <Loader radius={20} className={classes.loader} />
      ) : (
        <ProfileProductsList
          products={filteredProducts}
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
