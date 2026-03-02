"use client";
import { useCallback, useState } from "react";

import { MessageI } from "../../model";
import { promiseWrapper } from "../functions";

export const useAsyncFn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);

  const promise = useCallback(
    async (
      callback: () => Promise<void>,
      fallback?: (err?: string) => void,
    ) => {
      await promiseWrapper({
        setLoading,
        setError,
        callback,
        fallback,
      });
    },
    [],
  );

  return {
    loading,
    error,
    promise,
  };
};
