"use client";
import { useOrderPickupPoints } from "~/src/entities/order/lib/hooks";

import classes from "./modal.module.scss";
import YandexMapsWidget from "~/src/widgets/yandex-maps/ui";
import Modal from "~/src/shared/ui/modals/ui/default";
import OrderPickupPoint from "./pickup-point";
import OrderPickupPointMarker from "./marker";
import Loader from "~/src/shared/ui/loader";

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
      {isOpen && !loading && (
        <YandexMapsWidget
          wrapperClassName={`relative ${classes.map}`}
          markers={points.map((p, index) => ({
            ...p,
            coordinates: [p.longitude, p.latitude],
            name: p.name,
            key: p.id || index,
            description: p.work_hours,
          }))}
          onMarkerClick={(m) => onPointClick(m)}
          renderMarkerChildren={(m) => (
            <OrderPickupPointMarker {...m} key={m.key} />
          )}
        >
          <OrderPickupPoint choosePoint={onSavePoint} point={previewPoint} />
        </YandexMapsWidget>
      )}
    </Modal>
  );
}
