import classNames from "classnames";

import classes from "./info-container.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

export default function SellerOrderInfoContainer({
  children,
  className,
  borderColor = "#F3F4F6",
}: Props) {
  return (
    <div
      className={classNames(className, classes.container)}
      style={
        {
          "--border-color": borderColor,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
