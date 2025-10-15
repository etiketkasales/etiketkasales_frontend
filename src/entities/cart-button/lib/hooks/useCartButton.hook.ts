interface Props {
  updateInfo?: () => Promise<void>;
}

export const useCartButton = ({ updateInfo }: Props) => {
  const handleButtonClick = async (callback: () => Promise<void>) => {
    try {
      await callback();
      await updateInfo?.();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleButtonClick,
  };
};
