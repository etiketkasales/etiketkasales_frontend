import classNames from "classnames";

import XCircle from "~/public/shared/x-circle.svg";
import Button from "~/src/shared/ui/button";
import CurrentFiltersItemWrapper from "..";

interface Props {
  type: "yellow" | "neutral";
  children: React.ReactNode;
  onButtonClick: () => void;
  className?: string;
  classNameIcon?: string;
  classNameButton?: string;
}

export default function FilterWrapperWithIcon({
  type,
  children,
  onButtonClick,
  className,
  classNameIcon,
  classNameButton,
}: Props) {
  return (
    <CurrentFiltersItemWrapper
      type={type}
      className={classNames(className, `flex-row gap-2 align-center`)}
    >
      {children}
      <Button
        typeButton="ghost"
        size="0"
        needActiveScale={false}
        onClick={onButtonClick}
        className={classNameButton}
      >
        <XCircle className={classNameIcon} />
      </Button>
    </CurrentFiltersItemWrapper>
  );
}
