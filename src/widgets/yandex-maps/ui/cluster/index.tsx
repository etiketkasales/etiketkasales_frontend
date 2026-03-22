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
        length < 5 && classes.md,
        length >= 5 && classes.lg,
        "place-center",
      )}
    >
      <span
        className={classNames(
          "text-neutral-1000 heading",
          length < 5 && "h6",
          length >= 5 && "h4",
        )}
      >
        {length}
      </span>
    </div>
  );
}
