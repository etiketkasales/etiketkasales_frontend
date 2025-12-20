import { apiClient, tryCatch } from "~/src/shared/lib";
import {
  IDeliveryMethodResponse,
  IPaymentMethodResponse,
  IProductForDeliveryMethod,
} from "../../model";
import { IGetData } from "~/src/shared/model";

export const getDeliveryMethodsForOrder = async (
  delivery_address_id: number,
  products: IProductForDeliveryMethod[],
) => {
  return await tryCatch(async () => {
    const productsParam = JSON.stringify(products);
    const res = await apiClient.get<IGetData<IDeliveryMethodResponse[]>>(
      `/delivery-methods/`,
      {
        params: {
          delivery_address_id,
          products: productsParam,
        },
      },
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
  receiver_name: string;
  receiver_surname: string;
  receiver_phone: string;
  receiver_email: string;
}
export const createOrder = async (params: ICreateOrderParams) => {
  return await tryCatch(
    async () => {
      const res = await apiClient.post<{ success: boolean }>(
        `/orders/create-from-cart/`,
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
}

export const createOrderForCompany = async (
  params: ICreateOrderForCompanyParams,
) => {
  return await tryCatch(
    async () => {
      const res = await apiClient.post<{ success: boolean }>(
        `/orders/create-from-cart-company/`,
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
