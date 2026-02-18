import classNames from "classnames";

import classes from "./fs-modal-title.module.scss";
import Icon from "~/public/modal/chevron-compact-left.svg";
import Container from "~/src/shared/ui/container/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  title: string;
  onClose: () => void;
  needButton?: boolean;
  className?: string;
  textClassName?: string;
  backButtonClassName?: string;
}

export default function ModalTitle({
  title,
  onClose,
  needButton,
  className,
  backButtonClassName,
  textClassName,
}: Props) {
  return (
    <Container className={classNames(className, classes.container)}>
      <div className={`relative ${classes.content}`}>
        <h2
          className={classNames(
            "heading h6 text-center text-neutral-900",
            textClassName,
          )}
        >
          {title}
        </h2>
        {needButton && (
          <Button
            typeButton="ghost"
            size="0"
            onClick={onClose}
            className={classNames(classes.button, backButtonClassName)}
            needActiveScale={false}
          >
            <Icon />
          </Button>
        )}
      </div>
    </Container>
  );
}
