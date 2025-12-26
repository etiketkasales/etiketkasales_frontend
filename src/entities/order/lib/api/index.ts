import { apiClient, tryCatch } from "~/src/shared/lib";
import {
  IDeliveryMethodResponse,
  IOrderPickupPointResponse,
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
      const res = await apiClient.post<IGetData<{ id: number }>>(
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
      const res = await apiClient.post<IGetData<{ id: number }>>(
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

export const getPickupPointsData = async (
  delivery_address_id: number,
  delivery_method: string,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<IOrderPickupPointResponse[]>>(
      `/delivery-methods/pickup-points`,
      {
        params: {
          delivery_address_id,
          delivery_method,
        },
      },
    );
    return res.data.data;
  });
};

export const createOrderPayment = async (order_id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<{ payment_url: string }>>(
      `/orders/${order_id}/payment/`,
    );
    return res.data.data;
  });
};
