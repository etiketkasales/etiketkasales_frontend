import { useCallback } from "react";

export const useGetUser = () => {
  const handleGetUser = useCallback(async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    handleGetUser,
  };
};
