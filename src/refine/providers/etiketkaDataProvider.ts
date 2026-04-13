import type {
  BaseRecord,
  CrudFilter,
  DataProvider,
  GetListParams,
  UpdateParams,
} from "@refinedev/core";
import { apiClient } from "~/src/shared/lib/api/client.api";

type ApiEnvelope<T> = { success: boolean; data?: T; message?: string };

function filtersToQuery(
  resource: string,
  filters?: CrudFilter[],
): Record<string, string> {
  const q: Record<string, string> = {};
  if (!filters?.length) {
    return q;
  }
  for (const f of filters) {
    if (!("field" in f)) {
      continue;
    }
    const val = f.value;
    if (val === undefined || val === null || val === "") {
      continue;
    }
    if (f.operator === "eq") {
      q[f.field] = String(val);
    }
    if (f.operator === "in") {
      const v = Array.isArray(val) ? val[0] : val;
      if (v !== undefined && v !== null && v !== "") {
        q[f.field] = String(v);
      }
    }
    if (
      f.operator === "contains" &&
      (resource === "orders" || resource === "users" || resource === "products")
    ) {
      q.search = String(val);
    }
  }
  return q;
}

async function getListInner<T extends BaseRecord>(
  resource: string,
  params: GetListParams,
): Promise<{ data: T[]; total: number }> {
  const { pagination, filters, sorters } = params;
  const query: Record<string, string> = {
    page: String(pagination?.currentPage ?? 1),
    limit: String(pagination?.pageSize ?? 20),
  };
  if (sorters?.length) {
    query.sort_by = sorters[0].field;
    query.sort_order = sorters[0].order === "asc" ? "ASC" : "DESC";
  }
  Object.assign(query, filtersToQuery(resource, filters));

  const { data } = await apiClient.get<
    ApiEnvelope<{
      orders?: T[];
      users?: T[];
      products?: T[];
      pagination: {
        total: number;
        current_page: number;
        per_page: number;
      };
    }>
  >(`/admin/${resource}`, { params: query });

  if (!data.success || !data.data) {
    throw new Error(data.message ?? "Ошибка списка");
  }

  const inner = data.data;
  const total = inner.pagination?.total ?? 0;

  if (resource === "orders" && inner.orders) {
    return { data: inner.orders, total };
  }
  if (resource === "users" && inner.users) {
    return { data: inner.users, total };
  }
  if (resource === "products" && inner.products) {
    return { data: inner.products, total };
  }

  throw new Error(`Неизвестный ресурс: ${resource}`);
}

export const etiketkaDataProvider: DataProvider = {
  getApiUrl: () => "",

  getList: async (params) => {
    return getListInner(params.resource, params);
  },

  getOne: async () => {
    throw new Error("getOne не поддерживается API");
  },

  create: async () => {
    throw new Error("create не поддерживается");
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = object>({
    resource,
    id,
    variables,
  }: UpdateParams<TVariables>) => {
    const { data } = await apiClient.put<ApiEnvelope<unknown>>(
      `/admin/${resource}/${id}`,
      variables,
    );
    if (!data.success) {
      throw new Error(data.message ?? "Ошибка обновления");
    }
    return { data: { ...(variables as object), id } as TData };
  },

  deleteOne: async () => {
    throw new Error("delete не поддерживается");
  },
};
