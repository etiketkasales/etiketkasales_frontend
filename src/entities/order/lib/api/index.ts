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
  await tryCatch(async () => {
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
