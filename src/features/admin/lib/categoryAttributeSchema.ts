/** Поле шаблона карточки из `categories.attribute_schema`. */
export type CategoryAttributeField = {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "boolean";
  required?: boolean;
  options?: string[];
};

export function parseAttributeSchema(raw: unknown): CategoryAttributeField[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  const out: CategoryAttributeField[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      continue;
    }
    const row = item as Record<string, unknown>;
    const key = String(row.key ?? "").trim();
    if (!key) {
      continue;
    }
    const label = String(row.label ?? key).trim() || key;
    const typeRaw = String(row.type ?? "text").toLowerCase();
    const type: CategoryAttributeField["type"] =
      typeRaw === "number" || typeRaw === "select" || typeRaw === "boolean"
        ? typeRaw
        : "text";
    const required =
      row.required === true || row.required === 1 || row.required === "1";
    let options: string[] | undefined;
    if (Array.isArray(row.options)) {
      options = row.options.map((o) => String(o).trim()).filter(Boolean);
    }
    out.push({
      key,
      label,
      type,
      required: required || undefined,
      options: options?.length ? options : undefined,
    });
  }
  return out;
}

export function schemaKeySet(fields: CategoryAttributeField[]): Set<string> {
  return new Set(fields.map((f) => f.key));
}

/** Значения по шаблону и свободные пары для legacy-редактора. */
export function splitSpecificationsBySchema(
  specifications: Record<string, unknown> | null | undefined,
  schemaKeys: Set<string>,
): {
  categoryAttrs: Record<string, string | number | boolean>;
  freePairs: Array<{ key: string; value: string }>;
} {
  const categoryAttrs: Record<string, string | number | boolean> = {};
  const freePairs: Array<{ key: string; value: string }> = [];
  if (!specifications || typeof specifications !== "object") {
    return { categoryAttrs, freePairs };
  }
  for (const [key, val] of Object.entries(specifications)) {
    const k = key.trim();
    if (!k) {
      continue;
    }
    if (schemaKeys.has(k)) {
      if (typeof val === "boolean" || typeof val === "number") {
        categoryAttrs[k] = val;
      } else {
        categoryAttrs[k] = val == null ? "" : String(val);
      }
    } else {
      freePairs.push({ key: k, value: val == null ? "" : String(val) });
    }
  }
  return { categoryAttrs, freePairs };
}

/** Приводит значения из `specifications` к типам полей формы. */
export function normalizeCategoryAttrsForForm(
  attrs: Record<string, string | number | boolean>,
  fields: CategoryAttributeField[],
): Record<string, string | number | boolean> {
  const out = { ...attrs };
  for (const f of fields) {
    if (!(f.key in out)) {
      continue;
    }
    const raw = out[f.key];
    if (f.type === "boolean") {
      out[f.key] =
        raw === true ||
        raw === 1 ||
        raw === "1" ||
        String(raw).toLowerCase() === "true" ||
        String(raw).toLowerCase() === "yes";
    } else if (f.type === "number") {
      const n = typeof raw === "number" ? raw : Number(String(raw));
      if (!Number.isNaN(n)) {
        out[f.key] = n;
      }
    }
  }
  return out;
}

export function mergeSpecificationsPayload(
  categoryAttrs: Record<string, unknown> | null | undefined,
  specPairs: Array<{ key?: string; value?: string }> | null | undefined,
  schemaKeys: Set<string>,
): Record<string, string> {
  const specifications: Record<string, string> = {};
  if (categoryAttrs && typeof categoryAttrs === "object") {
    for (const fieldKey of schemaKeys) {
      const raw = categoryAttrs[fieldKey];
      if (raw === undefined || raw === null) {
        continue;
      }
      if (typeof raw === "boolean") {
        specifications[fieldKey] = raw ? "1" : "0";
      } else {
        const s = String(raw).trim();
        if (s !== "") {
          specifications[fieldKey] = s;
        }
      }
    }
  }
  for (const row of specPairs ?? []) {
    const k = String(row?.key ?? "").trim();
    if (!k || schemaKeys.has(k)) {
      continue;
    }
    specifications[k] = String(row?.value ?? "").trim();
  }
  return specifications;
}
