"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCompany } from "~/src/app/store/reducers/company.slice";
import { useCheckRegInfo } from "../lib/hooks/useCheckRegInfo.hook";

import CompanyRegistration from "~/src/entities/company-registration/ui";
import FormPageWrapper from "~/src/shared/ui/form-page/ui";
import Loader from "~/src/shared/ui/loader";

export default function CompanyRegistrationPage() {
  const { push, prefetch } = useRouter();
  const { stage, nextStage } = useAppSelector(selectCompany);
  const { needRedirect, loading } = useCheckRegInfo();

  useEffect(() => {
    if (nextStage) {
      const route = `/company/registrate/${nextStage}`;
      prefetch(route);
    }
  }, [nextStage, prefetch]);

  useEffect(() => {
    const currentRoute = `/company/registrate/${stage}`;
    if (window.location.pathname !== currentRoute) {
      push(currentRoute);
    }
  }, [stage, push]);

  // if (needRedirect) return redirect("/profile/seller-pending");

  if (loading) {
    return <Loader radius={0} />;
  } else {
    if (!stage) return null;

    return (
      <FormPageWrapper needBgSvg>
        <CompanyRegistration stage={stage} />
      </FormPageWrapper>
    );
  }
}
