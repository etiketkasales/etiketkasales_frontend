import classNames from "classnames";

import classes from "./confirm-modal.module.scss";
import ProfileModalWrapper from "../wrapper";
import Button from "~/src/shared/ui/button";
import Loader from "~/src/shared/ui/loader";

export interface IProfileConfirmModalButton {
  title: string;
  type: "yellow" | "gray-border";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttons: IProfileConfirmModalButton[];
  containerClassName?: string;
  loading: boolean;
}

export default function ProfileConfirmModal({
  title,
  buttons,
  containerClassName,
  isOpen,
  onClose,
  loading,
}: Props) {
  return (
    <ProfileModalWrapper
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      className={classNames(containerClassName, "relative gap-6 flex-column")}
      needBackButton={false}
    >
      {loading && <Loader radius={20} />}
      <div className={`flex-row ${classes.container}`}>
        {buttons.map((item, index) => (
          <Button
            key={item.type + index}
            typeButton={item.type}
            onClick={item.onClick}
            disabled={item.disabled}
            className={classNames(item.className, classes.button)}
            radius={12}
            size="12"
          >
            <span
              className={`heading h7 text-${item.type === "yellow" ? "yellow-1000" : "neutral-800"}`}
            >
              {item.title}
            </span>
          </Button>
        ))}
      </div>
    </ProfileModalWrapper>
  );
}
