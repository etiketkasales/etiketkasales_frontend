"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { lookupCompanyByInn } from "~/src/entities/profile-section/lib/api";

interface ICompanyLookupData {
  name?: string | null;
  short_name?: string | null;
  inn?: string | null;
  kpp?: string | null;
  ogrn?: string | null;
  legal_address?: string | null;
}

export const useInnLookup = (innRaw: string | null | undefined) => {
  const inn = useMemo(() => String(innRaw ?? "").replace(/\D/g, ""), [innRaw]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<ICompanyLookupData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastRequestedInnRef = useRef<string>("");

  useEffect(() => {
    if (inn.length !== 10 && inn.length !== 12) {
      lastRequestedInnRef.current = "";
      setCompany(null);
      setError(null);
      return;
    }

    if (lastRequestedInnRef.current === inn) return;
    lastRequestedInnRef.current = inn;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await lookupCompanyByInn(inn);
        if (cancelled) return;

        if (!res?.success || res.data == null) {
          setCompany(null);
          setError(
            (res?.message && String(res.message).trim()) ||
              "Не удалось найти организацию",
          );
          return;
        }

        setCompany(res.data);
        setError(null);
      } catch (e: any) {
        if (cancelled) return;
        setCompany(null);
        const axMsg =
          e?.response?.data?.message &&
          String(e.response.data.message).trim();
        setError(axMsg || e?.message || "Ошибка поиска по ИНН");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inn]);

  return { inn, loading, company, error };
};

