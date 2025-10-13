interface Props {
  updateInfo?: () => void;
}

export const useCartButton = ({ updateInfo }: Props) => {
  const handleButtonClick = async (callback: () => Promise<void>) => {
    try {
      await callback();
      updateInfo?.();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleButtonClick,
  };
};
