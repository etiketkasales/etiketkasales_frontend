import classNames from "classnames";

import classes from "./back-media.module.scss";
import BackIcon from "~/public/header/back-icon.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  children: React.ReactNode;
  classNameBackButton?: string;
  containerClassName?: string;
  onBackClick?: () => void;
}

export default function HeaderWithBackMedia({
  children,
  classNameBackButton,
  containerClassName,
  onBackClick,
}: Props) {
  return (
    <div className={classNames(`relative`, containerClassName)}>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          if (onBackClick) {
            onBackClick();
          } else {
            history.back();
          }
        }}
        className={classNames(classNameBackButton, classes.button)}
      >
        <BackIcon />
      </Button>
      {children}
    </div>
  );
}
