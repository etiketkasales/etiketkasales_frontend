import { useCallback, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib";

interface Props {
  updateInfo?: () => Promise<void>;
}

export const useCartButton = ({ updateInfo }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleButtonClick = useCallback(
    async (callback: () => Promise<void>) => {
      await promiseWrapper({
        setLoading,
        callback,
      });
      try {
        await updateInfo?.();
      } catch (e) {
        console.error(e);
      }
    },
    [updateInfo],
  );

  return {
    handleButtonClick,
    loading,
  };
};
