import classNames from "classnames";

import classes from "../item-wrapper.module.scss";
import ItemSkeletonTop from "./top";
import ItemWrapperCaptionSkeleton from "./caption";

interface Props {
  className?: string;
}

export default function ItemWrapperSkeleton({ className }: Props) {
  return (
    <li
      className={classNames(
        `${classes.container} flex-column cursor flex-start`,
        className,
      )}
    >
      <ItemSkeletonTop />
      <ItemWrapperCaptionSkeleton />
    </li>
  );
}
