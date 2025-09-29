import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { SellerI } from "~/src/shared/ui/seller-info/model/seller.interface";

interface Props {
  sellerId: number;
}

export const useSeller = ({ sellerId }: Props) => {
  const [sellerInfo, setSellerInfo] = useState<SellerI | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleGetSeller = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!sellerId) {
          setError(true);
          return;
        }
      },
      setErrBool: setError,
    });
  }, [sellerId]);

  useEffect(() => {
    handleGetSeller();
  }, [sellerId, handleGetSeller]);

  return {
    sellerInfo,
    loading,
    error,
  };
};
