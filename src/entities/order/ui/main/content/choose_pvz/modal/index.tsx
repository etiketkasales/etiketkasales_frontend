"use client";
import { useOrderPickupPoints } from "~/src/entities/order/lib/hooks";

import classes from "./modal.module.scss";
import YandexMaps21Widget from "~/src/widgets/yandex-maps/ui/maps21";
import Modal from "~/src/shared/ui/modals/ui/default";
import OrderPickupPoint from "./pickup-point";
import PickupPointsList from "./pickup-points-list";
import Loader from "~/src/shared/ui/loader";

const hasYandexMapsKey = Boolean(
  process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY?.trim(),
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeliveryMethodModal({ isOpen, onClose }: Props) {
  const { loading, onSavePoint, onPointClick, previewPoint, points } =
    useOrderPickupPoints({ needLoad: true, onClose, isOpen });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Способ доставки"
      containerClassName={`flex-column ${classes.container}`}
      loaderRadius={20}
      needBackButton
      backButtonClassName={classes.backButton}
      titleClassName={classes.title}
    >
      {loading && <Loader radius={20} />}

      {!loading && points.length === 0 && (
        <p className={`text-body l text-neutral-800 ${classes.empty}`}>
          Пункты выдачи не найдены. Проверьте адрес доставки (город) или
          настройки СДЭК на сервере.
        </p>
      )}

      {!loading && points.length > 0 && hasYandexMapsKey && (
        <YandexMaps21Widget
          className={`relative ${classes.map}`}
          points={points}
          onPointClick={onPointClick}
        >
          <OrderPickupPoint choosePoint={onSavePoint} point={previewPoint} />
        </YandexMaps21Widget>
      )}

      {!loading && points.length > 0 && !hasYandexMapsKey && (
        <div className={`flex-column ${classes.fallback}`}>
          <p className="text-body s text-neutral-700">
            Карта недоступна (не задан NEXT_PUBLIC_YANDEX_MAPS_API_KEY). Выбор
            Выбор из списка:
          </p>
          <PickupPointsList
            points={points}
            selectedCode={previewPoint?.code}
            onSelect={(point) => {
              onPointClick(point);
              onSavePoint(point);
            }}
          />
        </div>
      )}
    </Modal>
  );
}
