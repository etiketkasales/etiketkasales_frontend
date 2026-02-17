import classNames from "classnames";

import classes from "./address.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { IUserAddress } from "~/src/features/user/model";

interface Props extends IUserAddress {
  onClick: (id: number) => void;
}

export default function ModalAddress({
  id,
  is_default,
  onClick,
  city,
  street,
  house,
  entrance,
  apartment,
  floor,
}: Props) {
  const getAddressText = () => {
    const address = [city, street, house, entrance, apartment, floor]
      .filter(Boolean)
      .join(", ");
    return address;
  };

  return (
    <Container
      bgColor={"neutral-300"}
      onClick={() => onClick(id)}
      as="li"
      className={classNames(
        classes.container,
        "flex-row gap-1 align-center pointer",
      )}
      style={
        {
          "--order": is_default ? 0 : 1,
        } as React.CSSProperties
      }
    >
      <span
        className={`text-body xl text-neutral-800 ellipsis ${classes.text}`}
      >
        {getAddressText()}
      </span>
    </Container>
  );
}
