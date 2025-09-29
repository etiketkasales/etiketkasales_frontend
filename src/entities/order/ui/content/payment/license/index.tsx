"use client";
import React from "react";

import classes from "./license.module.scss";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  licenseAgreed: boolean;
  setLicenseAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderLicenseAgree({
  licenseAgreed,
  setLicenseAgreed,
}: Props) {
  return (
    <div className="flex-row gap-10px align-start relative">
      <CheckboxInput
        onChange={() => {
          setLicenseAgreed(!licenseAgreed);
        }}
        className={classes.checkbox}
        checked={licenseAgreed}
      />
      <p className="gray-2 text-16 second-family regular">
        Я принимаю{" "}
        <LinkContainer link={"/personal-data"} className="blue-link">
          Условия обработки персональных данных
        </LinkContainer>
        , а также{" "}
        <LinkContainer link={"/selling-terms"} className="blue-link">
          Условия продажи
        </LinkContainer>
      </p>
    </div>
  );
}
