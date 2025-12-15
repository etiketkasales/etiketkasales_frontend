import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getSellerInfoById } from "~/src/shared/ui/seller-info/lib/api";

import { ISellerInfo } from "~/src/shared/ui/seller-info/model";

interface Props {
  sellerId: number;
}

export const useSellerInfo = ({ sellerId }: Props) => {
  const { prefetch } = useRouter();
  const [sellerInfo, setSellerInfo] = useState<ISellerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getSellerInfo = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!sellerId) {
          setError(true);
          return;
        }

        const sellerInfo = await getSellerInfoById(sellerId);
        setSellerInfo(sellerInfo ?? null);
      },
      setErrBool: setError,
    });
  }, [sellerId]);

  // useEffect(() => {
  //   prefetch(`/seller/${sellerId}/`);
  // }, [sellerId, prefetch]);

  useEffect(() => {
    getSellerInfo();
  }, [getSellerInfo]);

  return {
    sellerInfo,
    loading,
    error,
  };
};
