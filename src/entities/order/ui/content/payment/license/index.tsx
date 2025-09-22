"use client";
import Link from "next/link";
import React from "react";

import classes from "./license.module.scss";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";

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
        <Link
          href={"/personal-data"}
          rel="noopener norefferer"
          className="blue-link"
        >
          Условия обработки персональных данных
        </Link>
        , а также{" "}
        <Link
          href={"/selling-terms"}
          rel="noopener norefferer"
          className="blue-link"
        >
          Условия продажи
        </Link>
      </p>
    </div>
  );
}
