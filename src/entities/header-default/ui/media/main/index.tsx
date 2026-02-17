import classNames from "classnames";

import classes from "./media-main.module.scss";
import HeaderLogo from "~/src/entities/header-default/ui/logo";
import HeaderForBussiness from "~/src/entities/header-default/ui/for-bussiness";

interface Props {
  heightRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeaderMediaMain({ heightRef }: Props) {
  return (
    <div
      className={classNames(
        "flex-row space-between gap-10px align-center",
        classes.container,
      )}
      ref={heightRef}
    >
      <HeaderLogo imageSrc="/header/logo-media.svg" width={125} height={40} />
      <HeaderForBussiness />
    </div>
  );
}
