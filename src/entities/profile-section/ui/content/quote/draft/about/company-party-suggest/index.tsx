"use client";

import { useCallback, useEffect, useState } from "react";
import { suggestPartyCompanies } from "~/src/entities/profile-section/lib/api";
import { IChangeableProfile } from "~/src/features/user/model";

import classes from "../../inputs/input/inn-lookup/inn-lookup.module.scss";

type Row = {
  name?: string | null;
  short_name?: string | null;
  inn?: string | null;
  kpp?: string | null;
  ogrn?: string | null;
  legal_address?: string | null;
};

interface Props {
  /** Значение поля «Наименование компании» — по нему ищем подсказки */
  query: string;
  onChange: (v: string, field: keyof IChangeableProfile) => void;
  /**
   * Пока query совпадает с этим значением (после trim), поиск не вызывается —
   * чтобы при открытии карточки с уже сохранённым названием не дёргать API.
   * Без пропа ведёт себя как раньше.
   */
  holdSearchWhileQueryEquals?: string;
}

export default function CompanyPartySuggest({
  query,
  onChange,
  holdSearchWhileQueryEquals,
}: Props) {
  const q = query.trim();
  const hold = (holdSearchWhileQueryEquals ?? "").trim();
  const searchHeldByBaseline = hold.length >= 3 && q.length >= 3 && q === hold;
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  /** После выбора карточки не показываем список и не дёргаем API, пока не сбросили */
  const [selectionLocked, setSelectionLocked] = useState(false);
  const [appliedLabel, setAppliedLabel] = useState("");

  useEffect(() => {
    if (selectionLocked) {
      return;
    }
    if (q.length < 3) {
      setItems([]);
      setError(null);
      return;
    }
    if (searchHeldByBaseline) {
      setItems([]);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const t = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await suggestPartyCompanies(q);
        if (cancelled) return;
        if (!res?.success || !Array.isArray(res.data)) {
          setItems([]);
          setError(
            (res?.message && String(res.message).trim()) ||
              "Не удалось получить подсказки",
          );
          return;
        }
        setItems(res.data);
      } catch (e: unknown) {
        if (cancelled) return;
        setItems([]);
        const ax = e as { response?: { data?: { message?: string } } };
        const msg =
          ax?.response?.data?.message &&
          String(ax.response.data.message).trim();
        setError(msg || "Ошибка поиска по названию");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 420);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [q, selectionLocked, searchHeldByBaseline]);

  useEffect(() => {
    if (q.length < 3) {
      setSelectionLocked(false);
    }
  }, [q.length]);

  const apply = useCallback(
    (row: Row) => {
      const title = row.short_name?.trim() || row.name?.trim() || "Организация";
      setAppliedLabel(title);
      setSelectionLocked(true);
      setItems([]);
      setError(null);
      setLoading(false);

      const innDigits = String(row.inn ?? "").replace(/\D/g, "");
      if (innDigits.length === 10 || innDigits.length === 12) {
        onChange(innDigits, "inn");
      }
      if (row.name) onChange(row.name, "company_name");
      else if (row.short_name) onChange(row.short_name, "company_name");
      if (row.kpp) onChange(row.kpp, "kpp");
      if (row.ogrn) onChange(row.ogrn, "ogrn");
      if (row.legal_address) {
        onChange(row.legal_address, "legal_address");
        onChange(row.legal_address, "actual_address");
      }
    },
    [onChange],
  );

  if (q.length < 3) {
    return (
      <p className={`text-body xs text-neutral-500`}>
        Начните вводить название — покажем организации из ЕГРЮЛ и подставим ИНН
        и адрес по выбору.
      </p>
    );
  }

  if (searchHeldByBaseline) {
    return null;
  }

  if (selectionLocked) {
    return (
      <div className={`flex-column gap-2 ${classes.wrap}`}>
        <div className={classes.compactBar}>
          <span className="text-body s text-neutral-700">
            Выбрано: {appliedLabel}
          </span>
          <button
            type="button"
            className={classes.compactLink}
            onClick={() => {
              setSelectionLocked(false);
            }}
          >
            Искать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-column gap-2 ${classes.wrap}`}>
      {loading && (
        <p className={`text-body s text-neutral-500`}>Ищем организации…</p>
      )}

      {!loading && error && (
        <div className={`${classes.card} ${classes.cardError}`}>
          <p className={`text-body m ${classes.errorText}`}>{error}</p>
        </div>
      )}

      {!loading && !error && items.length === 0 ? (
        <p className={`text-body s text-neutral-500`}>Ничего не найдено</p>
      ) : null}
      {!loading &&
        items.map((row, idx) => {
          const title =
            row.short_name?.trim() || row.name?.trim() || `Вариант ${idx + 1}`;
          const innDigits = String(row.inn ?? "").replace(/\D/g, "");
          const innOk = innDigits.length === 10 || innDigits.length === 12;
          return (
            <button
              key={`${row.inn ?? ""}-${idx}-${title.slice(0, 24)}`}
              type="button"
              className={`${classes.card} ${classes.cardAsButton}`}
              onClick={() => apply(row)}
              aria-label={`Подставить реквизиты: ${title}`}
            >
              <p className={`text-body m text-neutral-900 ${classes.title}`}>
                {title}
              </p>
              <p className={`text-body s ${classes.meta}`}>
                {innOk ? `ИНН: ${innDigits}` : "ИНН: уточните вручную"}
                {row.kpp ? ` · КПП: ${row.kpp}` : ""}
              </p>
              {row.legal_address ? (
                <p className={`text-body s ${classes.address}`}>
                  {row.legal_address}
                </p>
              ) : null}
            </button>
          );
        })}
    </div>
  );
}
