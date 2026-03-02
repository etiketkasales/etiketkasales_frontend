"use client";
import { useClickOutside } from "~/src/shared/lib";

import classNames from "classnames";
import { createPortal } from "react-dom";

import classes from "./suggestions.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { IAddressSuggestionResponse } from "~/src/features/user/model";

interface Props {
  suggestions: IAddressSuggestionResponse[];
  onItemClick: (address: IAddressSuggestionResponse) => void;
  setIsOpened: (b: boolean) => void;
  loading: boolean;
  isOpened: boolean;
  preventModalClose: () => void;
  portalStyle?: React.CSSProperties;
  className?: string;
}

// Вынести в отдельный дропдаун компонент
export default function AddressInputSuggestions({
  suggestions,
  onItemClick,
  setIsOpened,
  preventModalClose,
  loading,
  isOpened,
  portalStyle,
  className,
}: Props) {
  const ref = useClickOutside(() => setIsOpened(false));

  return createPortal(
    <Container
      className={classNames(
        `flex-column gap-2 scrollbar`,
        classes.container,
        className,
        {
          [classes.active]:
            isOpened && Array.isArray(suggestions) && suggestions.length > 0,
        },
      )}
      role="list"
      ref={ref}
      style={portalStyle}
      data-modal-layer
      onTouchStart={preventModalClose}
      onMouseDown={preventModalClose}
    >
      {loading && <div className={classes.loader}></div>}
      {suggestions.map((item, index) => (
        <div
          key={`${index}-${item.label}`}
          className={`${classes.item} pointer no-scrollbar`}
          role="listitem"
          onClick={() => {
            if (!loading) onItemClick(item);
          }}
        >
          <span className={`text-body base text-neutral-1000 ${classes.text}`}>
            {item.label}
          </span>
        </div>
      ))}
    </Container>,
    document.body,
  );
}
