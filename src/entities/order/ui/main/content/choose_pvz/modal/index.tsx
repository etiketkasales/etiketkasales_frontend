"use client";
import { useOrderPickupPoints } from "~/src/entities/order/lib/hooks";

import classes from "./modal.module.scss";
import YandexMapsWidget from "~/src/widgets/yandex-maps/ui";
import Modal from "~/src/shared/ui/modals/ui/default";
import OrderPickupPoint from "./pickup-point";
import Loader from "~/src/shared/ui/loader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeliveryMethodModal({ isOpen, onClose }: Props) {
  const { loading, onSavePoint, onPointClick, previewPoint, points } =
    useOrderPickupPoints({ needLoad: true, onClose });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Способ доставки"
      containerClassName={`flex-column ${classes.container}`}
      loaderRadius={20}
    >
      {loading && <Loader radius={20} />}
      <YandexMapsWidget wrapperClassName={`relative ${classes.map}`}>
        <OrderPickupPoint choosePoint={onSavePoint} point={previewPoint} />
      </YandexMapsWidget>
    </Modal>
  );
}
