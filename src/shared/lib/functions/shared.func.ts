import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { MessageI } from "~/src/shared/model";

type ApiErrorBody = {
  message?: string;
  error?: string;
  success?: boolean;
  details?: Record<string, unknown>;
};

function detailValueToString(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map((x) => String(x)).join(" ");
  if (v != null && typeof v === "object") {
    return JSON.stringify(v);
  }
  return String(v ?? "");
}

function getAxiosErrorPayload(err: unknown): ApiErrorBody | undefined {
  const axiosErr = err as AxiosError<ApiErrorBody | string>;
  const raw = axiosErr.response?.data;
  if (raw === undefined || raw === null) {
    return undefined;
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as ApiErrorBody;
  }
  if (typeof raw === "string") {
    const t = raw.trim();
    if (t.startsWith("{") || t.startsWith("[")) {
      try {
        const p = JSON.parse(t) as unknown;
        if (typeof p === "object" && p !== null && !Array.isArray(p)) {
          return p as ApiErrorBody;
        }
      } catch {
        /* ignore */
      }
    }
    return { message: t };
  }
  return undefined;
}

/** Из ответа API (400 validation, admin { success, message } и др.) — текст для toast и поле для подсветки формы */
export function parseAxiosApiValidation(err: unknown): {
  message: string;
  field: MessageI["field"];
} {
  const axiosErr = err as AxiosError<ApiErrorBody>;
  const body = getAxiosErrorPayload(err);
  if (body && typeof body === "object") {
    const details = body.details;
    if (details && typeof details === "object" && !Array.isArray(details)) {
      const entries = Object.entries(details)
        .map(([k, v]) => [k, detailValueToString(v)] as const)
        .filter(([, v]) => v.trim().length > 0);
      if (entries.length > 0) {
        const [firstField, firstMsg] = entries[0];
        const summary = entries.map(([k, v]) => `${k}: ${v}`).join("; ");
        return {
          message: summary || firstMsg,
          field: firstField,
        };
      }
    }
  }
  const data = body as ApiErrorBody | undefined;
  const single =
    (data && typeof data.message === "string" && data.message.trim()
      ? data.message
      : undefined) ||
    (data && typeof data.error === "string" && data.error.trim()
      ? data.error
      : undefined) ||
    axiosErr.message ||
    "Произошла ошибка";
  return { message: single, field: "global" };
}

interface PromiseWrapperProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  callback: (...args: any) => Promise<void>;
  setError?: Dispatch<SetStateAction<MessageI | null>>;
  errorMessage?: string;
  setErrBool?: Dispatch<SetStateAction<boolean>>;
  needLoad?: boolean;
  fallback?: (err?: string) => void;
  onFinal?: () => void;
}
export async function promiseWrapper({
  setLoading,
  callback,
  setError,
  errorMessage,
  needLoad = true,
  fallback,
  setErrBool,
  onFinal,
}: PromiseWrapperProps) {
  try {
    if (needLoad) {
      setLoading(true);
    }
    await callback();
  } catch (err) {
    const parsed = parseAxiosApiValidation(err);
    const msg =
      parsed.message && parsed.message !== "Произошла ошибка"
        ? parsed.message
        : errorMessage || parsed.message;
    setError?.({
      message: msg,
      type: "error",
      field: parsed.field,
    });
    setErrBool?.(true);
    console.error(err);
    fallback?.(msg);
    throw err;
  } finally {
    setLoading(false);
    onFinal?.();
  }
}
