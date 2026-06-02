import classNames from "classnames";

import classes from "./item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import DeliveryMethodHeader from "./header";
import DeliveryMethodText from "./text";
import DeliveryMethodButton from "./button";
import { IDeliveryMethodResponse } from "~/src/entities/order/model";
import { resolveDeliveryIcon } from "~/src/entities/order/lib/utils/deliveryIcon";

interface Props {
  method: IDeliveryMethodResponse;
  isActive: boolean;
  addressName: string | null;
  canChoosePvz: boolean;
  chooseDeliveryMethod: (method: IDeliveryMethodResponse) => boolean;
  openModal: () => void;
}

export default function DeliveryMethodItem({
  method,
  isActive,
  addressName,
  canChoosePvz,
  chooseDeliveryMethod,
  openModal,
}: Props) {
  const isAvailable = method.online !== false;

  return (
    <Container
      bgColor={"neutral-200"}
      className={classNames(`flex-column`, classes.container, {
        pointer: isAvailable,
        [classes.disabled]: !isAvailable,
      })}
      onClick={() => {
        if (!isAvailable) return;
        const needsPvz = chooseDeliveryMethod(method);
        if (needsPvz) {
          openModal();
        }
      }}
    >
      <DeliveryMethodHeader
        isActive={isActive}
        image={resolveDeliveryIcon(method.code, method.image_url)}
      />
      <DeliveryMethodText
        name={method.name}
        address={addressName}
        canChoose={canChoosePvz}
        isAvailable={isAvailable}
      />
      {isAvailable ? (
        <DeliveryMethodButton canChoose={canChoosePvz} onClick={openModal} />
      ) : (
        <p className="text-body s text-neutral-700">Скоро</p>
      )}
    </Container>
  );
}
