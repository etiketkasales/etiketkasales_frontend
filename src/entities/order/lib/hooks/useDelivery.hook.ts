import { useState } from "react";

export const useDelivery = () => {
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return {
    loading,
    methods,
  };
};
