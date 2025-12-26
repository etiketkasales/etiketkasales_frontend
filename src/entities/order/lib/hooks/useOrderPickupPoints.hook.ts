import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import {
  selectOrder,
  setOrderPickupPoint,
} from "~/src/app/store/reducers/order.slice";
import { promiseWrapper } from "~/src/shared/lib";
import { getPickupPointsData } from "../api";

import { IOrderPickupPointData, IOrderPickupPointResponse } from "../../model";

interface Props {
  needLoad?: boolean;
}

/**
 * Хук для получения списка ПВЗ, установки в стейт и сохранения выбранной точки в глобальный стейт.
 * @param {boolean} needLoad - нужно ли загрузить список ПВЗ
 * @returns {object} - объект с функциями onSavePoint, onPointClick, previewPoint, points, loading
 */
export const useOrderPickupPoints = ({ needLoad }: Props) => {
  const dispatch = useAppDispatch();
  const { deliveryMethod, deliveryAddressId } = useAppSelector(selectOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const [points, setPoints] = useState<IOrderPickupPointResponse[]>([]);
  const [previewPoint, setPreviewPoint] =
    useState<IOrderPickupPointResponse | null>(null);

  const createNotification = useCallback(
    (msg: string, type?: "error" | "warning") => {
      dispatch(
        addNotification({
          message: msg,
          type: type || "error",
          field: "global",
        }),
      );
    },
    [dispatch],
  );

  // Получение массивоа ПВЗ и установка в стейт
  const getPickupPoints = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!deliveryAddressId || !deliveryMethod?.code) {
          createNotification("Выберите адрес доставки и способ доставки");
          return;
        }

        const res = await getPickupPointsData(
          deliveryAddressId,
          deliveryMethod.code,
        );
        if (res && res.length) setPoints(res);
      },
    });
  }, [deliveryAddressId, deliveryMethod.code, createNotification]);

  const onPointClick = useCallback((point: IOrderPickupPointResponse) => {
    setPreviewPoint(point);
  }, []);

  // Сохранение выбранной точки в глобальный стейт
  const onSavePoint = useCallback(
    (point: IOrderPickupPointResponse) => {
      const newPoint: IOrderPickupPointData = {
        pickup_point_address: point.full_address,
        pickup_point_id: point.id,
      };
      dispatch(setOrderPickupPoint(newPoint));
    },
    [dispatch],
  );

  useEffect(() => {
    if (needLoad) {
      getPickupPoints();
    }
  }, [needLoad, getPickupPoints]);

  return {
    onSavePoint,
    onPointClick,
    previewPoint,
    points,
    loading,
  };
};
