import { apiClient, tryCatch } from "~/src/shared/lib";
import {
  ICreatedOrderDto,
  ICreatePaymentDto,
  IDeliveryMethodResponse,
  IItemToOrder,
  IOrderPickupPointResponse,
  IPaymentMethodResponse,
} from "../../model";
import { IGetData } from "~/src/shared/model";

export const getDeliveryMethodsForOrder = async () => {
  return await tryCatch(async () => {
    const res =
      await apiClient.get<IGetData<IDeliveryMethodResponse[]>>(
        `/delivery-methods/`,
      );
    return res.data.data;
  });
};

export const getPaymentMethodsForOrder = async (
  is_company: boolean,
  amount: number,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<IPaymentMethodResponse[]>>(
      `/payment-methods/`,
      {
        params: {
          is_company,
          amount,
        },
      },
    );
    return res.data.data;
  });
};

interface ICreateOrderParams {
  delivery_address_id: number | string;
  delivery_method: string;
  items: IItemToOrder[];
  pickup_point_code: string;
  payment_method: string;
}
export const createOrder = async (params: ICreateOrderParams) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<ICreatedOrderDto>>(
      `/users/orders/`,
      params,
    );
    return res.data;
  });
};

interface ICreateOrderForCompanyParams extends ICreateOrderParams {
  company_id: number;
  receiver_name: string;
  receiver_surname: string;
  receiver_phone: string;
  receiver_email: string;
}

export const createOrderForCompany = async (
  params: ICreateOrderForCompanyParams,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<ICreatedOrderDto>>(
      `/orders/create-company/`,
      params,
    );
    return res.data;
  });
};

export const getPickupPointsData = async (
  delivery_method: string,
  limit?: number,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<IOrderPickupPointResponse[]>>(
      `/delivery-methods/pickup-points`,
      {
        params: {
          delivery_method,
          limit: limit || 50,
        },
      },
    );
    return res.data;
  });
};

export const createOrderPayment = async (
  order_id: number,
  options?: {
    payment_method?: string;
    company_id?: number;
  },
) => {
  return await tryCatch(async () => {
    const body: Record<string, string | number> = {};
    if (options?.payment_method) {
      body.payment_method = options.payment_method;
    }
    if (options?.company_id) {
      body.company_id = options.company_id;
    }

    const res = await apiClient.post<IGetData<ICreatePaymentDto>>(
      `/orders/${order_id}/payment/`,
      Object.keys(body).length > 0 ? body : undefined,
    );
    return res.data.data;
  });
};

export const syncOrderPaymentStatus = async (order_id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get(`/orders/${order_id}/payment/status/`);
    return res.data;
  });
};
