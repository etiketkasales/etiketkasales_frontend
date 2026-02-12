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
import { AxiosError } from "axios";

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
  delivery_address_id: number;
  delivery_method: string;
  items: IItemToOrder[];
  pickup_point_code: string;
}
export const createOrder = async (params: ICreateOrderParams) => {
  return await tryCatch(
    async () => {
      const res = await apiClient.post<IGetData<ICreatedOrderDto>>(
        `/users/orders/`,
        {
          ...params,
        },
      );
      return res.data;
    },
    (err) => {
      throw err;
    },
  );
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
  return await tryCatch(
    async () => {
      const res = await apiClient.post<IGetData<ICreatedOrderDto>>(
        `/orders/create-company/`,
        {
          ...params,
        },
      );
      return res.data;
    },
    (err) => {
      throw err;
    },
  );
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

export const createOrderPayment = async (order_id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<ICreatePaymentDto>>(
      `/orders/${order_id}/payment/`,
    );
    return res.data.data;
  });
};
