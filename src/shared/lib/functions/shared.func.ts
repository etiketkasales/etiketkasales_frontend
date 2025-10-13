import { Dispatch, SetStateAction } from "react";
import { MessageI } from "~/src/shared/model/shared.interface";

interface PromiseWrapperProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  callback: (...args: any) => Promise<void>;
  setError?: Dispatch<SetStateAction<MessageI | null>>;
  errorMessage?: string;
  setErrBool?: Dispatch<SetStateAction<boolean>>;
  needLoad?: boolean;
}

export async function promiseWrapper({
  setLoading,
  setError,
  errorMessage,
  needLoad = true,
  callback,
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
