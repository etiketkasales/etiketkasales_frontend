import React from "react";

import classes from "./profile-in-dev.module.scss";
import ProfileContentContainer from "../container";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

export default function ProfileInDev() {
  return (
    <ProfileContentContainer
      className={`place-center padding-16 ${classes.wrapper}`}
    >
      <div className="flex-column gap-10 align-center">
        <ImageWrapper
          src={"/logo.png"}
          width={262}
          height={49}
          fill
          className={classes.container}
        />
        <h2 className="heading h4 text-neutral-grey-900">
          Раздел в разработке
        </h2>
      </div>
    </ProfileContentContainer>
  );
}
