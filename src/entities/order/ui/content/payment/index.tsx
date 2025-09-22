"use client";
import React from "react";

import classes from "./payment.module.scss";
import ContainerShared from "~/src/shared/ui/container/ui";
import OrderPaymentPrices from "./prices";
import OrderGetToPayment from "./get-to-payment";
import OrderLicenseAgree from "./license";

interface Props {
  forCompany: boolean;
}

export default function OrderPayment({ forCompany }: Props) {
  const [licenseAgreed, setLicenseAgreed] = React.useState<boolean>(true);
  return (
    <ContainerShared padding={"16"} gap={6} className={`${classes.container}`}>
      <OrderPaymentPrices />
      <OrderGetToPayment
        forCompany={forCompany}
        licenseAgreed={licenseAgreed}
      />
      <OrderLicenseAgree
        licenseAgreed={licenseAgreed}
        setLicenseAgreed={setLicenseAgreed}
      />
    </ContainerShared>
  );
}
