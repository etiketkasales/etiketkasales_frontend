"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInnLookup } from "~/src/entities/profile-section/lib/hooks/quote/useInnLookup.hook";
import { IChangeableProfile } from "~/src/features/user/model";

import classes from "./inn-lookup.module.scss";

const INN_LOOKUP_FIELDS: (keyof IChangeableProfile)[] = [
  "company_name",
  "kpp",
  "ogrn",
  "legal_address",
  "actual_address",
];

interface Props {
  innValue: string;
  onChange: (v: string, field: keyof IChangeableProfile) => void;
}

export default function InnLookup({ innValue, onChange }: Props) {
  const digits = useMemo(
    () => String(innValue ?? "").replace(/\D/g, ""),
    [innValue],
  );
  const prevDigits = useRef<string | undefined>(undefined);
  const [cardFilled, setCardFilled] = useState(false);

  useEffect(() => {
    setCardFilled(false);
  }, [digits]);

  useEffect(() => {
    const d = digits;
    const prev = prevDigits.current;

    if (prev === undefined) {
      prevDigits.current = d;
      return;
    }

    const prevOk = prev.length === 10 || prev.length === 12;
    const nextOk = d.length === 10 || d.length === 12;
    const shouldClear =
      (prevOk && !nextOk) || (prevOk && nextOk && prev !== d);

    if (shouldClear) {
      for (const field of INN_LOOKUP_FIELDS) {
        onChange("", field);
      }
    }

    prevDigits.current = d;
  }, [digits, onChange]);

  const { loading, company, error } = useInnLookup(innValue);

  const displayTitle =
    company?.short_name?.trim() ||
    company?.name?.trim() ||
    "Организация найдена";

  const apply = useCallback(() => {
    if (!company) return;

    setCardFilled(true);

    if (company.name) onChange(company.name, "company_name");
    else if (company.short_name) onChange(company.short_name, "company_name");

    if (company.kpp) onChange(company.kpp, "kpp");
    if (company.ogrn) onChange(company.ogrn, "ogrn");
    if (company.legal_address) {
      onChange(company.legal_address, "legal_address");
      onChange(company.legal_address, "actual_address");
    }
  }, [company, onChange]);

  if (!innValue) return null;

  if (digits.length !== 10 && digits.length !== 12) {
    return null;
  }

  return (
    <div className={`flex-column gap-2 ${classes.wrap}`}>
      {loading && (
        <p className={`text-body s text-neutral-500`}>Поиск организации…</p>
      )}

      {!loading && error && (
        <div className={`${classes.card} ${classes.cardError}`}>
          <p className={`text-body m ${classes.errorText}`}>{error}</p>
        </div>
      )}

      {!loading && company && (
        <>
          {!cardFilled && (
            <p className={`text-body xs ${classes.hintOk}`}>
              Нажмите на карточку, чтобы заполнить поля формы
            </p>
          )}
          <button
            type="button"
            className={`${classes.card} ${classes.cardAsButton}`}
            onClick={apply}
            aria-label="Подставить реквизиты организации в форму"
          >
            <p className={`text-body m text-neutral-900 ${classes.title}`}>
              {displayTitle}
            </p>
            <p className={`text-body s ${classes.meta}`}>
              ИНН: {company.inn ?? digits}
              {company.kpp ? ` · КПП: ${company.kpp}` : ""}
            </p>
            {company.legal_address ? (
              <p className={`text-body s ${classes.address}`}>
                {company.legal_address}
              </p>
            ) : null}
          </button>
        </>
      )}
    </div>
  );
}
