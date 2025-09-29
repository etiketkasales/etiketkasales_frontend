"use client";
import React from "react";

import classes from "./payment.module.scss";
import OrderPaymentPrices from "./prices";
import OrderGetToPayment from "./get-to-payment";
import OrderLicenseAgree from "./license";
import Wrapper from "~/src/shared/ui/wrapper";

interface Props {
  forCompany: boolean;
}

export default function OrderPayment({ forCompany }: Props) {
  const [licenseAgreed, setLicenseAgreed] = React.useState<boolean>(true);
  return (
    <Wrapper padding={"16px"} className={`${classes.container}`}>
      <OrderPaymentPrices />
      <OrderGetToPayment
        forCompany={forCompany}
        licenseAgreed={licenseAgreed}
      />
      <OrderLicenseAgree
        licenseAgreed={licenseAgreed}
        setLicenseAgreed={setLicenseAgreed}
      />
    </Wrapper>
  );
}
