import { ISearchPagination } from "~/src/entities/etiketka/model";
import {
  IEditSellerProduct,
  INewProduct,
  INewProductFilter,
  ISellerProduct,
} from "~/src/entities/profile-section/model";
import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IFileUploadRes, IGetData } from "~/src/shared/model";

function parseProductImageUploadPayload(
  body: Record<string, unknown>,
): IFileUploadRes {
  if (body.success === false) {
    const msg =
      typeof body.message === "string" && body.message.trim()
        ? body.message
        : "Ошибка загрузки файла";
    throw Object.assign(new Error(msg), { response: { data: body } });
  }

  let node: unknown =
    body.data !== undefined && typeof body.data === "object" ? body.data : body;

  for (let depth = 0; depth < 3 && node && typeof node === "object"; depth++) {
    const o = node as Record<string, unknown>;
    if (typeof o.url === "string" && o.url.trim() !== "") {
      break;
    }
    if (o.data !== undefined && typeof o.data === "object") {
      node = o.data;
      continue;
    }
    break;
  }

  if (!node || typeof node !== "object") {
    throw new Error("В ответе сервера нет данных о загруженном файле");
  }

  const p = node as Record<string, unknown>;
  const url = p.url != null ? String(p.url).trim() : "";
  if (!url) {
    throw new Error("Сервер не вернул URL изображения");
  }

  const rawId = p.upload_id;
  let upload_id = 0;
  if (typeof rawId === "number" && Number.isFinite(rawId)) {
    upload_id = rawId;
  } else if (typeof rawId === "string" && rawId.trim() !== "") {
    const n = parseInt(rawId, 10);
    if (Number.isFinite(n)) {
      upload_id = n;
    }
  }
  if (!upload_id) {
    throw new Error("Сервер не вернул upload_id черновика файла");
  }

  return {
    upload_id,
    url,
    filename: typeof p.filename === "string" ? p.filename : undefined,
    original_name:
      typeof p.original_name === "string" ? p.original_name : undefined,
    size: typeof p.size === "number" ? p.size : undefined,
    type: typeof p.type === "string" ? p.type : undefined,
    thumbnail: typeof p.thumbnail === "string" ? p.thumbnail : undefined,
  };
}

export const uploadProductImage = async (
  formData: FormData,
): Promise<IFileUploadRes> => {
  const result = await tryCatch(async () => {
    const res = await apiClient.post(`/upload/product-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const body = res.data;
    if (!body || typeof body !== "object") {
      throw new Error("Пустой ответ сервера при загрузке файла");
    }

    return parseProductImageUploadPayload(body as Record<string, unknown>);
  });
  if (!result) {
    throw new Error("Не удалось загрузить изображение");
  }
  return result;
};

/** PDF к карточке товара; поле формы — `document`. */
export const uploadProductDocument = async (
  formData: FormData,
): Promise<IFileUploadRes> => {
  const result = await tryCatch(async () => {
    const res = await apiClient.post(`/upload/product-document`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const body = res.data;
    if (!body || typeof body !== "object") {
      throw new Error("Пустой ответ сервера при загрузке файла");
    }

    return parseProductImageUploadPayload(body as Record<string, unknown>);
  });
  if (!result) {
    throw new Error("Не удалось загрузить документ");
  }
  return result;
};

export const getNewProductFilters = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<INewProductFilter[]>>(
      `/products/filters/create-form/`,
    );
    return res.data.data;
  });
};

interface ISellerProductsResponse {
  products: ISellerProduct[];
  pagination: ISearchPagination;
}
export const getSellerProducts = async (page?: number, limit?: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISellerProductsResponse>>(
      `/seller/products/`,
      {
        params: {
          page: page || 1,
          limit: limit || 50,
        },
      },
    );
    return res.data.data;
  });
};

export const createNewProduct = async (data: INewProduct) => {
  return await tryCatch(async () => {
    const res = await apiClient.post(`/products/`, {
      ...data,
    });

    return res.data;
  });
};

export const editSellerProduct = async (
  data: IEditSellerProduct,
  id: number,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.put(`/products/${id}`, {
      ...data,
    });
    return res.data;
  });
};

export const deleteSellerProduct = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.delete(`/products/${id}`);

    return res.data;
  });
};
