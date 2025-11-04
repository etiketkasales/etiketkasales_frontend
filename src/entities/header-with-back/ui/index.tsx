import React from "react";

import HeaderWithBackMedia from "./media";
import HeaderDefault, { IHeaderDefaultProps } from "../../header-default/ui";

interface Props extends IHeaderDefaultProps {
  children: React.ReactNode;
  classNameBackButton?: string;
  onBackClick?: () => void;
}

export default function HeaderWithBack({
  children,
  classNameBackButton,
  onBackClick,
  ...rest
}: Props) {
  return (
    <HeaderDefault
      mediaBgColor="neutral-100"
      CustomMediaHeader={
        <HeaderWithBackMedia
          classNameBackButton={classNameBackButton}
          onBackClick={onBackClick}
        >
          {children}
        </HeaderWithBackMedia>
      }
      needTranslate={false}
      {...rest}
    />
  );
}
