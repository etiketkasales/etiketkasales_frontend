import classNames from "classnames";

import classes from "./radio-button.module.scss";
import RadioDefault from "~/public/shared/radio-default.svg";
import RadioChecked from "~/public/shared/radio-checked.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  isActive: boolean;
  onClick?: () => void;
  text?: string;
  className?: string;
  classNameText?: string;
}

export default function RadioButton({
  isActive,
  onClick,
  text,
  className,
  classNameText,
}: Props) {
  return (
    <Button
      typeButton="ghost"
      size="0"
      onClick={onClick}
      className={className}
      needActiveScale={false}
      justifyCenter={false}
    >
      <div className={classes.iconsContainer}>
        <RadioDefault
          className={classNames(classes.icon, {
            [classes.active]: !isActive,
          })}
        />
        <RadioChecked
          className={classNames(classes.icon, {
            [classes.active]: isActive,
          })}
        />
      </div>
      {text && <span className={classNameText}>{text}</span>}
    </Button>
  );
}
