import classNames from "classnames";

import classes from "./aside-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import LinkPrefetcher from "~/src/shared/ui/link-prefetcher/ui";

interface Props {
  onClick: () => void;
  title: string;
  isActive: boolean;
  isDangerous?: boolean;
  prefetchLink?: string;
}

export default function ProfileAsideItem({
  onClick,
  title,
  isActive,
  isDangerous = false,
  prefetchLink,
}: Props) {
  return (
    <>
      {prefetchLink && <LinkPrefetcher link={prefetchLink} />}
      <Container
        bgColor={!isActive ? "neutral-100" : "yellow-200"}
        className={classNames(
          `flex-row space-betweeen align-center gap-6px pointer`,
          classes.container,
          {
            [classes.dangerous]: isDangerous,
          },
        )}
        onClick={onClick}
      >
        <p className="text-body xl text-yellow-1000">{title}</p>
      </Container>
    </>
  );
}
