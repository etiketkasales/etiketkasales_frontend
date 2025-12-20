import classes from "./modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeliveryMethodModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Способ доставки"
      containerClassName={`flex-column ${classes.container}`}
      loaderRadius={20}
    >
      <></>
    </Modal>
  );
}
