import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { MessageI } from "~/src/shared/model";

interface PromiseWrapperProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  callback: (...args: any) => Promise<void>;
  setError?: Dispatch<SetStateAction<MessageI | null>>;
  errorMessage?: string;
  setErrBool?: Dispatch<SetStateAction<boolean>>;
  needLoad?: boolean;
  fallback?: () => void;
}

export async function promiseWrapper({
  setLoading,
  callback,
  setError,
  errorMessage,
  needLoad = true,
  fallback,
  setErrBool,
}: PromiseWrapperProps) {
  try {
    if (needLoad) {
      setLoading(true);
    }
    await callback();
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    setError?.({
      message: errorMessage || "Произошла ошибка",
      type: "error",
      field: "global",
    });
    setErrBool?.(true);
    console.error(error);
    fallback?.();
    throw error;
  } finally {
    setLoading(false);
  }
}
