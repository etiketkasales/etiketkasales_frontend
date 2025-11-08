import React from "react";

import classes from "./company-avatar.module.scss";
import CompanyProfileAvatarNoImage from "./no-image";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  initCompanyAvatar: string | null;
}

export default function CompanyProfileAvatar({ initCompanyAvatar }: Props) {
  return (
    <Button
      typeButton="ghost"
      justifyCenter={false}
      needActiveScale={false}
      className="grid-column gap-4 align-center left-element"
    >
      {initCompanyAvatar ? (
        <ImageWrapper src={initCompanyAvatar} width={80} height={80} alt="" />
      ) : (
        <CompanyProfileAvatarNoImage />
      )}
      <span className="text-body l text-neutral-600 underline-front">
        Изменить аватар
      </span>
    </Button>
  );
}
