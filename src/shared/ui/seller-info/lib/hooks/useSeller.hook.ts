import { useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getSeller } from "../api/seller.api";

import { SellerI } from "~/src/shared/ui/seller-info/model/seller.interface";

interface Props {
  sellerId: number;
}

export const useSeller = ({ sellerId }: Props) => {
  const [sellerInfo, setSellerInfo] = useState<SellerI | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleGetSeller = async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!sellerId) {
          setError(true);
          return;
        }
        const response = await getSeller(sellerId);
        if (!response) {
          setError(true);
          return;
        }
        setSellerInfo(response);
      },
      setErrBool: setError,
    });
  };

  useEffect(() => {
    handleGetSeller();
  }, [sellerId]);

  return {
    sellerInfo,
    loading,
    error,
  };
};
