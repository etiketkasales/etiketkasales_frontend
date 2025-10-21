import { Dispatch, SetStateAction } from "react";
import { MessageI } from "~/src/shared/model/shared.interface";

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
    setError?.(null);
  } catch (err) {
    console.error(err);
    setError?.({
      message: errorMessage || "Произошла ошибка сервера",
      type: "error",
    });
    setErrBool?.(true);
  } finally {
    setLoading(false);
  }
}
