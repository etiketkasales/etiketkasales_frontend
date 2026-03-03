import classNames from "classnames";

import classes from "./button.module.scss";
import ImageIcon from "~/public/profile/products/image.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  error?: boolean;
}

export default function ProductImagesEditorButton({
  onClick,
  disabled,
  error,
}: Props) {
  return (
    <Button
      typeButton="ghost"
      className={classNames(
        "grid-row gap-10px pointer",
        classes.container,
        error && classes.error,
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      <ImageIcon className={classes.icon} />
      <p className="text-body l text-yellow-600 text-center">
        Добавить изображение
        <br />
        (в формате 1:1)
      </p>
    </Button>
  );
}
