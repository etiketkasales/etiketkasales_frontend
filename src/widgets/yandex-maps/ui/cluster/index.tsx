import classNames from "classnames";
import classes from "./cluster.module.scss";

interface Props {
  length: number;
}

export default function YMapsCluster({ length }: Props) {
  return (
    <div
      className={classNames(
        classes.container,
        "text-neutral-1000 heading",
        length < 5 && `${classes.md} h6`,
        length >= 5 && `${classes.lg} h4`,
      )}
    >
      {length}
    </div>
  );
}
