import { useState } from "react";

interface Props {
  updateInfo?: () => Promise<void>;
}

export const useCartButton = ({ updateInfo }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleButtonClick = async (callback: () => Promise<void>) => {
    try {
      setLoading(true);
      await callback();
      await updateInfo?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleButtonClick,
    loading,
  };
};
