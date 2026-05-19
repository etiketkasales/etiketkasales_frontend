"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { TableProps } from "antd";
import {
  Alert,
  App,
  Button,
  Card,
  Checkbox,
  Drawer,
  Input,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { getDefaultFilter } from "@refinedev/antd";
import { apiClient } from "~/src/shared/lib/api/client.api";
import CompanyPartySuggest from "~/src/entities/profile-section/ui/content/quote/draft/about/company-party-suggest";
import { lookupBankByBic } from "~/src/entities/profile-section/lib/api";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";
import {
  AdminActionSection,
  AdminActionSurface,
} from "~/src/features/admin/ui/admin-action-surface";

type SellerRow = {
  id: number;
  name: string | null;
  surname?: string | null;
  phone: string | null;
  email: string | null;
  company_name?: string | null;
  role: string;
  status?: string;
  seller_status?: string | null;
  company_verification_status?: string | null;
  blocked_reason?: string | null;
  seller_rejection_reason?: string | null;
  company_verification_payload?: unknown;
  products_count?: number;
  orders_count?: number;
  created_at: string;
  inn?: string | null;
  kpp?: string | null;
  ogrn?: string | null;
  legal_address?: string | null;
  actual_address?: string | null;
  bank_account?: string | null;
  bank_bik?: string | null;
  correspondent_account?: string | null;
  bank_name?: string | null;
  company_type?: string | null;
};

type SellerProfileResponse = {
  seller: SellerRow;
  stats: {
    products_total: number;
    products_approved: number;
    products_pending: number;
    products_rejected: number;
    orders_total: number;
  };
  verification_documents?: Array<{
    id: number;
    filename: string;
    type: string;
    kind: string;
    status: string;
    created_at?: string | null;
    url: string;
  }>;
  moderation_history: Array<{
    id: number;
    action_type: string;
    target_type: string;
    target_id: number;
    admin_name: string;
    details?: { reason?: string; comment?: string } | null;
    created_at?: string | null;
  }>;
};

type SellerVerificationPayload = {
  documents?: {
    inn_doc?: boolean;
    ogrn_doc?: boolean;
    bank_details_doc?: boolean;
    agreement_signed?: boolean;
  };
  note?: string;
  updated_at?: string;
};

const EMPTY_VERIFICATION_PAYLOAD: SellerVerificationPayload = {
  documents: {
    inn_doc: false,
    ogrn_doc: false,
    bank_details_doc: false,
    agreement_signed: false,
  },
  note: "",
};

function parseVerificationPayload(value: unknown): SellerVerificationPayload {
  if (!value) return { ...EMPTY_VERIFICATION_PAYLOAD };
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (typeof parsed !== "object" || !parsed)
      return { ...EMPTY_VERIFICATION_PAYLOAD };
    const root = parsed as Record<string, unknown>;
    const checklist = extractAdminDocumentsChecklist(root);
    const p =
      checklist ??
      ({
        documents: {},
        note: "",
      } as SellerVerificationPayload);
    return {
      documents: {
        inn_doc: Boolean(p.documents?.inn_doc),
        ogrn_doc: Boolean(p.documents?.ogrn_doc),
        bank_details_doc: Boolean(p.documents?.bank_details_doc),
        agreement_signed: Boolean(p.documents?.agreement_signed),
      },
      note: typeof p.note === "string" ? p.note : "",
      updated_at: typeof p.updated_at === "string" ? p.updated_at : undefined,
    };
  } catch {
    return { ...EMPTY_VERIFICATION_PAYLOAD };
  }
}

/** Чеклист вложен или legacy на верхнем уровне рядом с полями DaData — отличаем по ключам documents.* */
function extractAdminDocumentsChecklist(
  root: Record<string, unknown>,
): SellerVerificationPayload | null {
  const raw = root.admin_documents_checklist;
  if (typeof raw === "string" && raw.trim() !== "") {
    try {
      const o = JSON.parse(raw) as unknown;
      if (o && typeof o === "object" && !Array.isArray(o)) {
        return o as SellerVerificationPayload;
      }
    } catch {
      /* ignore */
    }
  }
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as SellerVerificationPayload;
  }
  const docs = root.documents;
  if (docs && typeof docs === "object" && !Array.isArray(docs)) {
    const d = docs as Record<string, unknown>;
    if (
      "inn_doc" in d ||
      "ogrn_doc" in d ||
      "bank_details_doc" in d ||
      "agreement_signed" in d
    ) {
      return root as unknown as SellerVerificationPayload;
    }
  }
  return null;
}

/** Чеклист сохраняется как admin_documents_checklist; DaData и т.д. остаются в JSON. */
function buildAdminVerificationPayloadToSave(
  draft: SellerVerificationPayload,
): {
  company_verification_payload: {
    admin_documents_checklist: SellerVerificationPayload;
  };
} {
  return {
    company_verification_payload: {
      admin_documents_checklist: {
        ...draft,
        updated_at: new Date().toISOString(),
      },
    },
  };
}

function suggestVerificationStatus(
  payload: SellerVerificationPayload,
  companyType?: string | null,
): "verified" | "pending" {
  const docs = payload.documents;
  const inn = Boolean(docs?.inn_doc);
  const bank = Boolean(docs?.bank_details_doc);
  const agr = Boolean(docs?.agreement_signed);
  const ogrn = Boolean(docs?.ogrn_doc);
  if (companyType === "sz") {
    return inn && bank && agr ? "verified" : "pending";
  }
  const allChecked = inn && ogrn && bank && agr;
  return allChecked ? "verified" : "pending";
}

const VERIFICATION_KIND_LABELS: Record<string, string> = {
  inn: "ИНН",
  ogrn: "ОГРН / ОГРНИП",
  bank: "Банковские реквизиты",
  agreement: "Договор",
};

const USER_STATUSES = ["active", "inactive", "restricted", "blocked"];
const SELLER_STATUSES = [
  "draft",
  "seller_pending",
  "pending",
  "approved",
  "rejected",
  "failed",
];
const COMPANY_VERIFICATION_STATUSES = [
  "draft",
  "pending",
  "verified",
  "failed",
];

function colorByStatus(status?: string | null): string {
  if (!status) return "default";
  if (status === "active" || status === "approved" || status === "verified") {
    return "green";
  }
  if (status === "blocked" || status === "rejected" || status === "failed") {
    return "red";
  }
  if (status === "restricted" || status === "inactive") {
    return "gold";
  }
  return "gold";
}

type SellerBusinessStatus =
  | "on_review"
  | "active"
  | "restricted"
  | "blocked"
  | "inactive"
  | "rejected_moderation";

function resolveSellerBusinessStatus(row: SellerRow): SellerBusinessStatus {
  if (row.status === "blocked") {
    return "blocked";
  }
  if (row.status === "inactive") {
    return "inactive";
  }
  if (row.status === "restricted") {
    return "restricted";
  }
  if (row.seller_status === "rejected" || row.seller_status === "failed") {
    return "rejected_moderation";
  }
  if (row.seller_status === "approved" && row.status === "active") {
    return "active";
  }
  return "on_review";
}

function sellerBusinessStatusLabel(status: SellerBusinessStatus): string {
  switch (status) {
    case "blocked":
      return "заблокирован";
    case "inactive":
      return "неактивен";
    case "restricted":
      return "ограничен";
    case "rejected_moderation":
      return "отклонён модерацией";
    case "active":
      return "активен";
    default:
      return "на проверке";
  }
}

function colorByBusinessStatus(status: SellerBusinessStatus): string {
  switch (status) {
    case "active":
      return "green";
    case "blocked":
    case "rejected_moderation":
      return "red";
    case "inactive":
      return "default";
    case "restricted":
      return "gold";
    default:
      return "processing";
  }
}

function formatCompanyType(t?: string | null): string {
  if (t === "ip") return "ИП";
  if (t === "ooo") return "ООО";
  if (t === "sz") return "Самозанятый";
  return t && t !== "" ? t : "—";
}

function moderationReasonFromDraft(draft: Partial<SellerRow>): string {
  return String(draft.seller_rejection_reason ?? "").trim();
}

/** Р/с в состоянии — только цифры (до 20); отображение группами по 4 */
function formatRuRs20Display(raw: string | null | undefined): string {
  const d = String(raw ?? "")
    .replace(/\D/g, "")
    .slice(0, 20);
  const parts: string[] = [];
  for (let i = 0; i < d.length; i += 4) {
    parts.push(d.slice(i, i + 4));
  }
  return parts.join(" ");
}

function validateAdminSellerRequisitesBank(
  d: Partial<SellerRow>,
): string | null {
  const bik = d.bank_bik ? String(d.bank_bik).replace(/\D/g, "") : "";
  if (
    d.bank_bik !== undefined &&
    d.bank_bik !== null &&
    String(d.bank_bik).trim() !== "" &&
    bik.length !== 9
  ) {
    return "БИК: ровно 9 цифр";
  }
  const rs = d.bank_account ? String(d.bank_account).replace(/\D/g, "") : "";
  if (
    d.bank_account !== undefined &&
    d.bank_account !== null &&
    String(d.bank_account).trim() !== "" &&
    rs.length !== 20
  ) {
    return "Р/с: ровно 20 цифр";
  }
  const cor = d.correspondent_account
    ? String(d.correspondent_account).replace(/\D/g, "")
    : "";
  if (
    d.correspondent_account !== undefined &&
    d.correspondent_account !== null &&
    String(d.correspondent_account).trim() !== "" &&
    cor.length !== 20
  ) {
    return "Корр. счёт: ровно 20 цифр";
  }
  const bn = (d.bank_name ?? "").trim();
  if (bn !== "" && (bn.length < 2 || bn.length > 255)) {
    return "Название банка: 2–255 символов";
  }
  return null;
}

export default function AdminSellersPage() {
  const { message: msgApi } = App.useApp();
  const [verificationUploadKind, setVerificationUploadKind] =
    useState<string>("inn");
  const [selectedSellerId, setSelectedSellerId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<SellerRow>>({});
  const [requisitesSaveErrorField, setRequisitesSaveErrorField] = useState<
    string | null
  >(null);
  const [verificationDraft, setVerificationDraft] =
    useState<SellerVerificationPayload>(EMPTY_VERIFICATION_PAYLOAD);
  const { tableProps, setFilters, filters, tableQuery, hiddenSearchForm } =
    useAdminTable({
      resource: "users",
      syncWithLocation: true,
    });

  const notifyAdminApiError = useCallback(
    (e: unknown, fallback?: string) => {
      const p = parseAxiosApiValidation(e);
      msgApi.error(p.message || fallback || "Ошибка");
      return p;
    },
    [msgApi],
  );

  const patchSellerDraft = useCallback((patch: Partial<SellerRow>) => {
    setRequisitesSaveErrorField(null);
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const commitVerificationDraft = useCallback(
    (next: SellerVerificationPayload) => {
      if (!selectedSellerId) return;
      void apiClient
        .put(
          `/admin/users/${selectedSellerId}`,
          buildAdminVerificationPayloadToSave(next),
        )
        .catch((e: unknown) => notifyAdminApiError(e));
    },
    [selectedSellerId, notifyAdminApiError],
  );

  const patchVerificationDraft = useCallback(
    (mut: (prev: SellerVerificationPayload) => SellerVerificationPayload) => {
      setVerificationDraft((prev) => {
        const next = mut(prev);
        commitVerificationDraft(next);
        return next;
      });
    },
    [commitVerificationDraft],
  );

  const runBankLookupByBic = useCallback(
    async (raw: string, source: "blur" | "button") => {
      const d = String(raw).replace(/\D/g, "");
      if (d.length !== 9) {
        if (source === "button") {
          msgApi.warning("Введите ровно 9 цифр БИК");
        }
        return;
      }
      try {
        const res = await lookupBankByBic(d);
        if (res?.success && res.data) {
          const { name, correspondent_account: cor } = res.data;
          const patch: Partial<SellerRow> = {};
          if (name && String(name).trim() !== "") {
            patch.bank_name = String(name).trim();
          }
          if (cor && String(cor).replace(/\D/g, "").length === 20) {
            patch.correspondent_account = String(cor).replace(/\D/g, "");
          }
          if (Object.keys(patch).length > 0) {
            patchSellerDraft(patch);
            const parts: string[] = [];
            if (patch.bank_name) parts.push("банк");
            if (patch.correspondent_account) parts.push("корр. счёт в ЦБ");
            msgApi.success(`Подставлено по БИК: ${parts.join(", ")}`);
            return;
          }
          msgApi.warning(
            "Справочник не вернул название банка и корр. счёт; проверьте БИК или введите вручную",
          );
          return;
        }
        const m =
          res?.message && String(res.message).trim() !== ""
            ? String(res.message)
            : "Банк с таким БИК не найден";
        msgApi.warning(m);
      } catch {
        msgApi.error("Не удалось получить данные банка (сеть или сервер)");
      }
    },
    [msgApi, patchSellerDraft],
  );

  const search = useRefineSearchFilterValue(filters);
  const {
    data: sellerProfile,
    isLoading: sellerProfileLoading,
    refetch: refetchSellerProfile,
  } = useQuery({
    queryKey: ["admin-seller-profile", selectedSellerId],
    enabled: Boolean(selectedSellerId),
    queryFn: async () => {
      if (!selectedSellerId) return null;
      const res = await apiClient.get<{
        success: boolean;
        data: SellerProfileResponse;
      }>(`/admin/sellers/${selectedSellerId}/profile`);
      return res.data.data;
    },
  });

  useEffect(() => {
    if (!sellerProfile?.seller) return;
    setRequisitesSaveErrorField(null);
    setDraft({
      company_name: sellerProfile.seller.company_name ?? "",
      company_type: sellerProfile.seller.company_type ?? undefined,
      inn: sellerProfile.seller.inn ?? "",
      kpp: sellerProfile.seller.kpp ?? "",
      ogrn: sellerProfile.seller.ogrn ?? "",
      legal_address: sellerProfile.seller.legal_address ?? "",
      actual_address: sellerProfile.seller.actual_address ?? "",
      bank_name: sellerProfile.seller.bank_name ?? "",
      bank_account: String(sellerProfile.seller.bank_account ?? "")
        .replace(/\D/g, "")
        .slice(0, 20),
      bank_bik: sellerProfile.seller.bank_bik ?? "",
      correspondent_account: sellerProfile.seller.correspondent_account ?? "",
      seller_rejection_reason:
        sellerProfile.seller.seller_rejection_reason ?? "",
    });
    setVerificationDraft(
      parseVerificationPayload(
        sellerProfile.seller.company_verification_payload,
      ),
    );
  }, [sellerProfile?.seller]);

  const suggestedStatus = suggestVerificationStatus(
    verificationDraft,
    sellerProfile?.seller.company_type,
  );
  const drawerBusinessStatus = sellerProfile?.seller
    ? resolveSellerBusinessStatus(sellerProfile.seller)
    : "on_review";

  useEffect(() => {
    setFilters([{ field: "role", operator: "eq", value: "seller" }], "merge");
  }, [setFilters]);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {hiddenSearchForm}
      <Card>
        <Space wrap>
          <Input.Search
            allowClear
            value={search}
            placeholder="Поиск продавца: имя / email / телефон"
            onChange={(e) =>
              setFilters(
                [
                  {
                    field: "search",
                    operator: "contains",
                    value: e.target.value || undefined,
                  },
                ],
                "merge",
              )
            }
            style={{ width: 320 }}
          />
          <Select
            allowClear
            style={{ width: 180 }}
            placeholder="Статус продавца"
            value={
              (
                getDefaultFilter("seller_status", filters, "eq") as
                  | string[]
                  | undefined
              )?.[0]
            }
            options={SELLER_STATUSES.map((s) => ({ label: s, value: s }))}
            onChange={(value) =>
              setFilters(
                [{ field: "seller_status", operator: "eq", value }],
                "merge",
              )
            }
          />
          <Select
            allowClear
            style={{ width: 220 }}
            placeholder="Верификация компании"
            value={
              (
                getDefaultFilter(
                  "company_verification_status",
                  filters,
                  "eq",
                ) as string[] | undefined
              )?.[0]
            }
            options={COMPANY_VERIFICATION_STATUSES.map((s) => ({
              label: s,
              value: s,
            }))}
            onChange={(value) =>
              setFilters(
                [
                  {
                    field: "company_verification_status",
                    operator: "eq",
                    value,
                  },
                ],
                "merge",
              )
            }
          />
          <Select
            allowClear
            style={{ width: 160 }}
            placeholder="Статус аккаунта"
            value={
              (
                getDefaultFilter("status", filters, "eq") as
                  | string[]
                  | undefined
              )?.[0]
            }
            options={USER_STATUSES.map((s) => ({ label: s, value: s }))}
            onChange={(value) =>
              setFilters([{ field: "status", operator: "eq", value }], "merge")
            }
          />
        </Space>
      </Card>

      <Table<SellerRow>
        {...(tableProps as TableProps<SellerRow>)}
        rowKey="id"
        onRow={(row) => ({
          onClick: () => setSelectedSellerId(row.id),
        })}
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
      >
        <Table.Column<SellerRow> dataIndex="id" title="ID" width={72} />
        <Table.Column<SellerRow>
          title="Продавец"
          render={(_, row) =>
            row.name || row.surname
              ? `${row.name ?? ""} ${row.surname ?? ""}`.trim()
              : "—"
          }
        />
        <Table.Column<SellerRow>
          dataIndex="company_name"
          title="Компания / ИП"
        />
        <Table.Column<SellerRow> dataIndex="email" title="Email" />
        <Table.Column<SellerRow>
          dataIndex="phone"
          title="Телефон"
          width={150}
        />
        <Table.Column<SellerRow>
          dataIndex="seller_status"
          title="Модерация продавца"
          width={170}
          render={(v?: string | null) => (
            <Tag color={colorByStatus(v)}>{v || "—"}</Tag>
          )}
        />
        <Table.Column<SellerRow>
          dataIndex="company_verification_status"
          title="Верификация"
          width={150}
          render={(v?: string | null) => (
            <Tag color={colorByStatus(v)}>{v || "—"}</Tag>
          )}
        />
        <Table.Column<SellerRow>
          dataIndex="status"
          title="Аккаунт"
          width={130}
          render={(v?: string) => (
            <Tag color={colorByStatus(v)}>{v || "active"}</Tag>
          )}
        />
        <Table.Column<SellerRow>
          title="Статус ТЗ"
          width={140}
          render={(_, row) => {
            const st = resolveSellerBusinessStatus(row);
            return (
              <Tag color={colorByBusinessStatus(st)}>
                {sellerBusinessStatusLabel(st)}
              </Tag>
            );
          }}
        />
        <Table.Column<SellerRow>
          title="Товары/Заказы"
          width={130}
          render={(_, row) =>
            `${row.products_count ?? 0} / ${row.orders_count ?? 0}`
          }
        />
        <Table.Column<SellerRow>
          title="Действия"
          width={420}
          render={(_, row) => (
            <AdminActionSurface>
              <AdminActionSection title="Модерация">
                <Space wrap size={6}>
                  <Select
                    size="small"
                    style={{ width: 150 }}
                    value={row.seller_status ?? "draft"}
                    options={SELLER_STATUSES.map((s) => ({
                      label: s,
                      value: s,
                    }))}
                    onChange={async (value) => {
                      if (value === "failed" || value === "rejected") {
                        msgApi.warning(
                          "Для статуса failed/rejected укажите причину в профиле продавца",
                        );
                        return;
                      }
                      try {
                        await apiClient.put(`/admin/users/${row.id}`, {
                          seller_status: value,
                        });
                        msgApi.success(`seller_status: ${value}`);
                        await tableQuery.refetch();
                      } catch (e) {
                        notifyAdminApiError(e);
                      }
                    }}
                  />
                  <Select
                    size="small"
                    style={{ width: 140 }}
                    value={row.status || "active"}
                    options={USER_STATUSES.map((s) => ({ label: s, value: s }))}
                    onChange={async (value) => {
                      try {
                        await apiClient.put(`/admin/users/${row.id}`, {
                          status: value,
                        });
                        msgApi.success(`status: ${value}`);
                        await tableQuery.refetch();
                      } catch (e) {
                        notifyAdminApiError(e);
                      }
                    }}
                  />
                </Space>
              </AdminActionSection>
              <AdminActionSection title="Профиль">
                <Space wrap size={6}>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSellerId(row.id);
                    }}
                  >
                    Профиль
                  </Button>
                  <Button
                    size="small"
                    onClick={async () => {
                      try {
                        await apiClient.put(`/admin/users/${row.id}`, {
                          status: "blocked",
                          blocked_reason: "Блокировка продавца из админки",
                        });
                        msgApi.success("Продавец заблокирован");
                        await tableQuery.refetch();
                      } catch (e) {
                        notifyAdminApiError(e);
                      }
                    }}
                  >
                    Блок
                  </Button>
                </Space>
              </AdminActionSection>
            </AdminActionSurface>
          )}
        />
      </Table>

      <Drawer
        width={920}
        open={Boolean(selectedSellerId)}
        onClose={() => setSelectedSellerId(null)}
        title={
          sellerProfile?.seller?.company_name ||
          sellerProfile?.seller?.name ||
          `Продавец #${selectedSellerId ?? ""}`
        }
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Space wrap size={16}>
            <Card>
              <Statistic
                title="Товары"
                value={sellerProfile?.stats.products_total ?? 0}
              />
            </Card>
            <Card>
              <Statistic
                title="Одобрено"
                value={sellerProfile?.stats.products_approved ?? 0}
              />
            </Card>
            <Card>
              <Statistic
                title="На модерации"
                value={sellerProfile?.stats.products_pending ?? 0}
              />
            </Card>
            <Card>
              <Statistic
                title="Отклонено"
                value={sellerProfile?.stats.products_rejected ?? 0}
              />
            </Card>
            <Card>
              <Statistic
                title="Заказов"
                value={sellerProfile?.stats.orders_total ?? 0}
              />
            </Card>
          </Space>

          <Card title="Анкета и реквизиты" loading={sellerProfileLoading}>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
              ID {sellerProfile?.seller.id ?? "—"}
              {" · "}
              {sellerProfile?.seller.email || "—"}
              {" · "}
              {sellerProfile?.seller.phone || "—"}
            </Typography.Paragraph>
            <Space direction="vertical" style={{ width: "100%" }} size={8}>
              <Space wrap style={{ width: "100%" }}>
                <Typography.Text type="secondary">
                  Тип организации
                </Typography.Text>
                <Select
                  style={{ width: 260 }}
                  placeholder="ИП / ООО / самозанятый"
                  allowClear
                  value={draft.company_type ?? undefined}
                  options={[
                    { label: "ИП", value: "ip" },
                    { label: "ООО", value: "ooo" },
                    { label: "Самозанятый", value: "sz" },
                  ]}
                  onChange={(v) =>
                    patchSellerDraft({ company_type: v ?? undefined })
                  }
                />
              </Space>
              <Input
                placeholder="Компания"
                value={draft.company_name ?? ""}
                onChange={(e) =>
                  patchSellerDraft({ company_name: e.target.value })
                }
              />
              <CompanyPartySuggest
                query={draft.company_name ?? ""}
                holdSearchWhileQueryEquals={
                  selectedSellerId &&
                  sellerProfile?.seller?.id === selectedSellerId
                    ? (sellerProfile.seller.company_name ?? "")
                    : undefined
                }
                onChange={(v, field) =>
                  patchSellerDraft({
                    [field]: v,
                  } as Partial<SellerRow>)
                }
              />
              <Space direction="vertical" style={{ width: "100%" }} size={8}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  ИНН, адреса, банк
                </Typography.Text>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="ИНН"
                    status={
                      requisitesSaveErrorField === "inn" ? "error" : undefined
                    }
                    value={draft.inn ?? ""}
                    onChange={(e) => patchSellerDraft({ inn: e.target.value })}
                  />
                  <Input
                    placeholder="КПП"
                    status={
                      requisitesSaveErrorField === "kpp" ? "error" : undefined
                    }
                    value={draft.kpp ?? ""}
                    onChange={(e) => patchSellerDraft({ kpp: e.target.value })}
                  />
                  <Input
                    placeholder="ОГРН"
                    status={
                      requisitesSaveErrorField === "ogrn" ? "error" : undefined
                    }
                    value={draft.ogrn ?? ""}
                    onChange={(e) => patchSellerDraft({ ogrn: e.target.value })}
                  />
                </Space.Compact>
                <Input
                  placeholder="Юридический адрес"
                  value={draft.legal_address ?? ""}
                  onChange={(e) =>
                    patchSellerDraft({
                      legal_address: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Фактический адрес"
                  value={draft.actual_address ?? ""}
                  onChange={(e) =>
                    patchSellerDraft({
                      actual_address: e.target.value,
                    })
                  }
                />
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Банк"
                    status={
                      requisitesSaveErrorField === "bank_name"
                        ? "error"
                        : undefined
                    }
                    value={draft.bank_name ?? ""}
                    onChange={(e) =>
                      patchSellerDraft({
                        bank_name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="0000 0000 0000 0000 0000"
                    maxLength={24}
                    inputMode="numeric"
                    autoComplete="off"
                    status={
                      requisitesSaveErrorField === "bank_account"
                        ? "error"
                        : undefined
                    }
                    value={formatRuRs20Display(draft.bank_account ?? "")}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 20);
                      patchSellerDraft({ bank_account: digits });
                    }}
                  />
                  <Input
                    placeholder="БИК"
                    status={
                      requisitesSaveErrorField === "bank_bik"
                        ? "error"
                        : undefined
                    }
                    value={draft.bank_bik ?? ""}
                    onChange={(e) =>
                      patchSellerDraft({
                        bank_bik: e.target.value,
                      })
                    }
                    onBlur={(e) => {
                      void runBankLookupByBic(e.currentTarget.value, "blur");
                    }}
                  />
                  <Button
                    type="default"
                    onClick={() => {
                      void runBankLookupByBic(draft.bank_bik ?? "", "button");
                    }}
                  >
                    По БИК
                  </Button>
                </Space.Compact>
                <Typography.Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  Название банка и корр. счёт в ЦБ подставляются по БИК (кнопка
                  «По БИК» или уход с поля БИК).
                </Typography.Text>
                <Input
                  placeholder="Корр. счет"
                  status={
                    requisitesSaveErrorField === "correspondent_account"
                      ? "error"
                      : undefined
                  }
                  value={draft.correspondent_account ?? ""}
                  onChange={(e) =>
                    patchSellerDraft({
                      correspondent_account: e.target.value,
                    })
                  }
                />
                <Input.TextArea
                  rows={2}
                  placeholder="Причина отклонения продавца (если есть)"
                  value={draft.seller_rejection_reason ?? ""}
                  onChange={(e) =>
                    patchSellerDraft({
                      seller_rejection_reason: e.target.value,
                    })
                  }
                />
              </Space>
              <Button
                type="primary"
                onClick={async () => {
                  if (!selectedSellerId) return;
                  const bankErr = validateAdminSellerRequisitesBank(draft);
                  if (bankErr) {
                    msgApi.error(bankErr);
                    return;
                  }
                  try {
                    await apiClient.put(`/admin/users/${selectedSellerId}`, {
                      ...draft,
                      ...buildAdminVerificationPayloadToSave(verificationDraft),
                    });
                    setRequisitesSaveErrorField(null);
                    msgApi.success("Реквизиты продавца обновлены");
                    await tableQuery.refetch();
                    await refetchSellerProfile();
                  } catch (e) {
                    const p = notifyAdminApiError(e);
                    setRequisitesSaveErrorField(
                      p.field && p.field !== "global" ? String(p.field) : null,
                    );
                  }
                }}
              >
                Сохранить реквизиты
              </Button>
            </Space>
          </Card>

          <Card title="Быстрая модерация" loading={sellerProfileLoading}>
            <Space style={{ marginBottom: 8 }} wrap>
              <Tag color={colorByBusinessStatus(drawerBusinessStatus)}>
                Статус ТЗ: {sellerBusinessStatusLabel(drawerBusinessStatus)}
              </Tag>
              <Button
                size="small"
                onClick={async () => {
                  if (!selectedSellerId) return;
                  try {
                    await apiClient.put(`/admin/users/${selectedSellerId}`, {
                      status: "active",
                      seller_status: "approved",
                    });
                    msgApi.success("Продавец активирован");
                    await tableQuery.refetch();
                    await refetchSellerProfile();
                  } catch (e) {
                    notifyAdminApiError(e);
                  }
                }}
              >
                Активировать
              </Button>
              <Button
                size="small"
                onClick={async () => {
                  if (!selectedSellerId) return;
                  try {
                    await apiClient.put(`/admin/users/${selectedSellerId}`, {
                      status: "restricted",
                    });
                    msgApi.success("Продавец ограничен");
                    await tableQuery.refetch();
                    await refetchSellerProfile();
                  } catch (e) {
                    notifyAdminApiError(e);
                  }
                }}
              >
                Ограничить
              </Button>
              <Button
                size="small"
                danger
                onClick={async () => {
                  if (!selectedSellerId) return;
                  try {
                    await apiClient.put(`/admin/users/${selectedSellerId}`, {
                      status: "blocked",
                      blocked_reason: "Блокировка продавца из карточки",
                    });
                    msgApi.success("Продавец заблокирован");
                    await tableQuery.refetch();
                    await refetchSellerProfile();
                  } catch (e) {
                    notifyAdminApiError(e);
                  }
                }}
              >
                Заблокировать
              </Button>
            </Space>
            <Space wrap>
              <Space direction="vertical" size={4}>
                <Tag color="default">Статус аккаунта</Tag>
                <Select
                  style={{ width: 160 }}
                  value={sellerProfile?.seller.status || "active"}
                  options={USER_STATUSES.map((s) => ({ label: s, value: s }))}
                  onChange={async (value) => {
                    if (!selectedSellerId) return;
                    try {
                      await apiClient.put(`/admin/users/${selectedSellerId}`, {
                        status: value,
                      });
                      msgApi.success(`status: ${value}`);
                      await tableQuery.refetch();
                      await refetchSellerProfile();
                    } catch (e) {
                      notifyAdminApiError(e);
                    }
                  }}
                />
              </Space>
              <Space direction="vertical" size={4}>
                <Tag color="blue">Статус продавца</Tag>
                <Select
                  style={{ width: 180 }}
                  value={sellerProfile?.seller.seller_status ?? "draft"}
                  options={SELLER_STATUSES.map((s) => ({ label: s, value: s }))}
                  onChange={async (value) => {
                    if (!selectedSellerId) return;
                    const reason = moderationReasonFromDraft(draft);
                    if (
                      (value === "failed" || value === "rejected") &&
                      !reason
                    ) {
                      msgApi.warning("Укажите причину отклонения продавца");
                      return;
                    }
                    try {
                      await apiClient.put(`/admin/users/${selectedSellerId}`, {
                        seller_status: value,
                        seller_rejection_reason: reason || undefined,
                      });
                      msgApi.success(`seller_status: ${value}`);
                      await tableQuery.refetch();
                      await refetchSellerProfile();
                    } catch (e) {
                      notifyAdminApiError(e);
                    }
                  }}
                />
              </Space>
              <Space direction="vertical" size={4}>
                <Tag color="purple">Статус верификации компании</Tag>
                <Select
                  style={{ width: 220 }}
                  value={
                    sellerProfile?.seller.company_verification_status ?? "draft"
                  }
                  options={COMPANY_VERIFICATION_STATUSES.map((s) => ({
                    label: s,
                    value: s,
                  }))}
                  onChange={async (value) => {
                    if (!selectedSellerId) return;
                    const reason = moderationReasonFromDraft(draft);
                    if (value === "failed" && !reason) {
                      msgApi.warning(
                        "Для failed укажите причину отклонения продавца",
                      );
                      return;
                    }
                    try {
                      await apiClient.put(`/admin/users/${selectedSellerId}`, {
                        company_verification_status: value,
                        seller_rejection_reason: reason || undefined,
                      });
                      msgApi.success(`company_verification_status: ${value}`);
                      await tableQuery.refetch();
                      await refetchSellerProfile();
                    } catch (e) {
                      notifyAdminApiError(e);
                    }
                  }}
                />
              </Space>
            </Space>
            <Card
              title="Файлы верификации"
              loading={sellerProfileLoading}
              style={{ marginTop: 16 }}
            >
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Typography.Paragraph
                  type="secondary"
                  style={{ marginBottom: 0 }}
                >
                  Загрузите сканы/PDF для архива модерации. Ответ сервиса
                  проверки компании (DaData и др.) сохраняется отдельно и при
                  сохранении чеклиста не стирается.
                </Typography.Paragraph>
                <Space wrap align="center">
                  <Typography.Text strong>Тип документа:</Typography.Text>
                  <Select
                    style={{ width: 260 }}
                    value={verificationUploadKind}
                    options={[
                      {
                        label: VERIFICATION_KIND_LABELS.inn,
                        value: "inn",
                      },
                      {
                        label: VERIFICATION_KIND_LABELS.ogrn,
                        value: "ogrn",
                      },
                      {
                        label: VERIFICATION_KIND_LABELS.bank,
                        value: "bank",
                      },
                      {
                        label: VERIFICATION_KIND_LABELS.agreement,
                        value: "agreement",
                      },
                    ]}
                    onChange={setVerificationUploadKind}
                  />
                  <Upload
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    showUploadList={false}
                    disabled={!selectedSellerId}
                    customRequest={async ({
                      file,
                      onSuccess,
                      onError,
                      onProgress,
                    }) => {
                      if (!selectedSellerId) return;
                      try {
                        onProgress?.({ percent: 40 });
                        const fd = new FormData();
                        fd.append("file", file as Blob);
                        fd.append("kind", verificationUploadKind);
                        await apiClient.post(
                          `/admin/users/${selectedSellerId}/verification-document`,
                          fd,
                          {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          },
                        );
                        onProgress?.({ percent: 100 });
                        msgApi.success("Файл сохранён");
                        onSuccess?.({});
                        await refetchSellerProfile();
                      } catch (e) {
                        notifyAdminApiError(e, "Ошибка загрузки");
                        onError?.(new Error(String(e)));
                      }
                    }}
                  >
                    <Button loading={sellerProfileLoading}>Выбрать файл</Button>
                  </Upload>
                </Space>
                <Table
                  rowKey={(r) => String(r.id)}
                  pagination={{ pageSize: 6 }}
                  size="small"
                  locale={{
                    emptyText: "Файлов пока нет — загрузите через форму выше.",
                  }}
                  dataSource={sellerProfile?.verification_documents ?? []}
                  columns={[
                    {
                      title: "Тип",
                      width: 170,
                      render: (_, row) =>
                        VERIFICATION_KIND_LABELS[row.kind] ??
                        row.kind ??
                        row.type ??
                        "—",
                    },
                    {
                      title: "Файл",
                      ellipsis: true,
                      render: (_, row) =>
                        row.url ? (
                          <Typography.Link
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Открыть / скачать
                          </Typography.Link>
                        ) : (
                          (row.filename ?? "—")
                        ),
                    },
                    {
                      title: "Статус записи",
                      width: 90,
                      dataIndex: "status",
                    },
                    {
                      title: "Загрузка",
                      width: 170,
                      dataIndex: "created_at",
                    },
                  ]}
                />
              </Space>
            </Card>

            <Space
              direction="vertical"
              size={8}
              style={{ width: "100%", marginTop: 12 }}
            >
              {sellerProfile?.seller.company_type === "sz" ? (
                <Alert
                  showIcon
                  type="info"
                  message="Самозанятый"
                  description="Для режима самозанятого поле КПП обычно отсутствует; при проверке достаточно подтверждений ИНН, реквизитов и договора по чеклисту ниже."
                  style={{ marginBottom: 8 }}
                />
              ) : null}
              <Checkbox
                checked={Boolean(verificationDraft.documents?.inn_doc)}
                onChange={(e) => {
                  const v = e.target.checked;
                  patchVerificationDraft((prev) => ({
                    ...prev,
                    documents: {
                      ...EMPTY_VERIFICATION_PAYLOAD.documents,
                      ...prev.documents,
                      inn_doc: v,
                    },
                  }));
                }}
              >
                ИНН документ подтвержден
              </Checkbox>
              <Checkbox
                checked={Boolean(verificationDraft.documents?.ogrn_doc)}
                onChange={(e) => {
                  const v = e.target.checked;
                  patchVerificationDraft((prev) => ({
                    ...prev,
                    documents: {
                      ...EMPTY_VERIFICATION_PAYLOAD.documents,
                      ...prev.documents,
                      ogrn_doc: v,
                    },
                  }));
                }}
              >
                ОГРН/ОГРНИП подтвержден
              </Checkbox>
              <Checkbox
                checked={Boolean(verificationDraft.documents?.bank_details_doc)}
                onChange={(e) => {
                  const v = e.target.checked;
                  patchVerificationDraft((prev) => ({
                    ...prev,
                    documents: {
                      ...EMPTY_VERIFICATION_PAYLOAD.documents,
                      ...prev.documents,
                      bank_details_doc: v,
                    },
                  }));
                }}
              >
                Банковские реквизиты подтверждены
              </Checkbox>
              <Checkbox
                checked={Boolean(verificationDraft.documents?.agreement_signed)}
                onChange={(e) => {
                  const v = e.target.checked;
                  patchVerificationDraft((prev) => ({
                    ...prev,
                    documents: {
                      ...EMPTY_VERIFICATION_PAYLOAD.documents,
                      ...prev.documents,
                      agreement_signed: v,
                    },
                  }));
                }}
              >
                Договор подписан
              </Checkbox>
              <Input.TextArea
                rows={2}
                placeholder="Комментарий по проверке документов (сохраняется при уходе с поля)"
                value={verificationDraft.note ?? ""}
                onChange={(e) =>
                  setVerificationDraft((prev) => ({
                    ...prev,
                    note: e.target.value,
                  }))
                }
                onBlur={(e) => {
                  const note = e.target.value;
                  patchVerificationDraft((prev) => ({ ...prev, note }));
                }}
              />
              <Button
                onClick={async () => {
                  if (!selectedSellerId) return;
                  try {
                    await apiClient.put(
                      `/admin/users/${selectedSellerId}`,
                      buildAdminVerificationPayloadToSave(verificationDraft),
                    );
                    msgApi.success("Чеклист документов сохранён");
                    await refetchSellerProfile();
                  } catch (e) {
                    notifyAdminApiError(e);
                  }
                }}
              >
                Сохранить чеклист документов
              </Button>
              <Space>
                <Tag color={suggestedStatus === "verified" ? "green" : "gold"}>
                  Рекомендация: {suggestedStatus}
                </Tag>
                <Button
                  type="primary"
                  onClick={async () => {
                    if (!selectedSellerId) return;
                    try {
                      const toSave =
                        buildAdminVerificationPayloadToSave(verificationDraft);
                      await apiClient.put(`/admin/users/${selectedSellerId}`, {
                        company_verification_status: suggestedStatus,
                        ...toSave,
                      });
                      msgApi.success(
                        `Статус верификации обновлен: ${suggestedStatus}`,
                      );
                      await tableQuery.refetch();
                      await refetchSellerProfile();
                    } catch (e) {
                      notifyAdminApiError(e);
                    }
                  }}
                >
                  Применить рекомендуемый статус
                </Button>
              </Space>
            </Space>
          </Card>

          <Card title="Журнал решений модерации" loading={sellerProfileLoading}>
            <Table
              rowKey="id"
              size="small"
              dataSource={sellerProfile?.moderation_history ?? []}
              pagination={{ pageSize: 8 }}
              columns={[
                { title: "Когда", dataIndex: "created_at", width: 180 },
                { title: "Тип", dataIndex: "action_type", width: 170 },
                { title: "Админ", dataIndex: "admin_name", width: 180 },
                {
                  title: "Объект",
                  render: (_, r) => `${r.target_type}:${r.target_id}`,
                  width: 140,
                },
                {
                  title: "Причина/коммент",
                  render: (_, r) =>
                    r.details?.reason || r.details?.comment || "—",
                },
              ]}
              scroll={{ x: 900 }}
            />
          </Card>
        </Space>
      </Drawer>
    </Space>
  );
}
