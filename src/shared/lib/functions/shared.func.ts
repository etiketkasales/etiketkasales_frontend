import { Dispatch, SetStateAction } from "react";
import { MessageI } from "~/src/shared/model/shared.interface";

export async function promiseWrapper({
  setLoading,
  setError,
  needLoad = true,
  callback,
  setErrBool,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  callback: (...args: any) => Promise<void>;
  setError?: Dispatch<SetStateAction<MessageI | null>>;
  setErrBool?: Dispatch<SetStateAction<boolean>>;
  needLoad?: boolean;
}) {
  try {
    if (needLoad) {
      setLoading(true);
    }
    await callback();
    setError?.(null);
  } catch (err) {
    console.error(err);
    setError?.({
      message: "Произошла какая-то ошибка",
      type: "error",
    });
    setErrBool?.(true);
  } finally {
    setLoading(false);
  }
}
