"use client";
import classNames from "classnames";
import { useSellerInfo } from "~/src/shared/ui/seller-info/lib";

import classes from "./seller-info.module.scss";
import Container from "../../container/ui";
import SellerInfoDetails from "./info";
import Loader from "~/src/shared/ui/loader";

interface Props {
  sellerId: number;
  wrapperClassName?: string;
  infoClassName?: string;
  loaderRadius?: number;
}

export default function SellerInfo({
  sellerId,
  wrapperClassName,
  infoClassName,
  loaderRadius,
}: Props) {
  const { sellerInfo, loading, error } = useSellerInfo({ sellerId });

  return (
    <Container
      className={classNames(wrapperClassName, classes.container)}
      as="a"
      href={`#`}
    >
      {loading && <Loader radius={loaderRadius || 20} needCircle={false} />}
      <p className="text-body l text-neutral-700">Продавец</p>
      {sellerInfo && !error ? (
        <SellerInfoDetails {...sellerInfo} className={infoClassName} />
      ) : (
        <p className="text-body l text-neutral-900">
          Не удалось получить данные
        </p>
      )}
    </Container>
  );
}
