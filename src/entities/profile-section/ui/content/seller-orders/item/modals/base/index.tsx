import { ReactNode } from "react";
import classNames from "classnames";

import classes from "./base.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import Button from "~/src/shared/ui/button";
import { IOrderModalButton } from "~/src/entities/profile-section/model";

interface Props {
  onClose: () => void;
  isActive: boolean;
  title: string;
  children: ReactNode;
  loading: boolean;
  buttons: IOrderModalButton[];
  className?: string;
}

export default function OrderBaseModal({
  onClose,
  isActive,
  title,
  children,
  loading,
  buttons,
  className,
}: Props) {
  return (
    <Modal
      isOpen={isActive}
      onClose={onClose}
      title={title}
      containerClassName={classNames(
        className,
        classes.container,
        "flex-column",
      )}
      needBackButton={false}
      loading={loading}
      loaderRadius={20}
    >
      {children}
      <div className={`flex ${classes.buttons}`}>
        {buttons.map((item, index) => (
          <Button
            key={`${index}-${item.type}-${item.title}`}
            typeButton={item.type}
            onClick={item.onClick}
            className={classes.button}
          >
            <span className="heading h7">{item.title}</span>
          </Button>
        ))}
      </div>
    </Modal>
  );
}
