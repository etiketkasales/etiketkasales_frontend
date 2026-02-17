import classNames from "classnames";

import classes from "./load-button.module.scss";
import ImageIcon from "~/public/profile/products/image.svg";
import { MessageI } from "~/src/shared/model";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  error: MessageI | null;
}

export default function ProductModalLoadButton({
  onClick,
  disabled,
  error,
}: Props) {
  return (
    <div
      className={classNames(
        `flex-column align-center gap-10px pointer ${classes.container}`,
        classes.container,
        {
          [classes.error]:
            error &&
            (error.field === "images" || error.field === "image_upload_ids"),
        },
      )}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      <ImageIcon />
      <p className="text-body l text-yellow-600 text-center">
        Добавить изображение
        <br />
        (в формате 1:1)
      </p>
    </div>
  );
}
