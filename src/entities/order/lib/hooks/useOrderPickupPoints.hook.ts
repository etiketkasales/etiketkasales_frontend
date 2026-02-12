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
import { MessageI } from "~/src/shared/model";

interface Props {
  isOpen: boolean;
  needLoad?: boolean;
  onClose?: () => void;
}

/**
 * Хук для получения списка ПВЗ, установки в стейт и сохранения выбранной точки в глобальный стейт.
 * @param {boolean} needLoad - нужно ли загрузить список ПВЗ
 * @returns {object} - объект с функциями onSavePoint, onPointClick, previewPoint, points, loading
 */
export const useOrderPickupPoints = ({ needLoad, onClose, isOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { deliveryMethod } = useAppSelector(selectOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);
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

  // Получение массива ПВЗ и установка в стейт
  const getPickupPoints = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError,
      callback: async () => {
        if (!deliveryMethod?.code) {
          createNotification("Выберите способ доставки");
          return;
        }

        const res = await getPickupPointsData(deliveryMethod.code);
        if (!res.data || !res.data.length) {
          createNotification("ПВЗ не найдены");
          return;
        }
        setPoints(res.data);
      },
    });
  }, [deliveryMethod?.code, createNotification]);

  const onPointClick = useCallback((point: IOrderPickupPointResponse) => {
    setPreviewPoint(point);
  }, []);

  // Сохранение выбранной точки в глобальный стейт
  const onSavePoint = useCallback(
    (point: IOrderPickupPointResponse) => {
      const newPoint: IOrderPickupPointData = {
        pickup_point_code: point.code,
      };
      dispatch(setOrderPickupPoint(newPoint));
      onClose?.();
    },
    [dispatch, onClose],
  );

  useEffect(() => {
    if (needLoad && isOpen) {
      getPickupPoints();
    }
  }, [needLoad, getPickupPoints, isOpen]);

  useEffect(() => {
    if (error) {
      createNotification(error.message, "error");
    }
  }, [error, createNotification]);

  return {
    onSavePoint,
    onPointClick,
    previewPoint,
    points,
    loading,
  };
};
