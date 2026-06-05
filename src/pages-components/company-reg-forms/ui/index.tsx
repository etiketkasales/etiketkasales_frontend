"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCompany } from "~/src/app/store/reducers/company.slice";
import { useCheckRegInfo } from "../lib/hooks/useCheckRegInfo.hook";

import CompanyRegistration from "~/src/entities/company-registration/ui";
import FormPageWrapper from "~/src/shared/ui/form-page/ui";
import Loader from "~/src/shared/ui/loader";

export default function CompanyRegistrationPage() {
  const { push, prefetch, replace } = useRouter();
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

  useEffect(() => {
    if (needRedirect) {
      replace("/profile/seller-pending?active_section=quote");
    }
  }, [needRedirect, replace]);

  if (loading || needRedirect) {
    return <Loader radius={0} />;
  }

  if (!stage) {
    return null;
  }

  return (
    <FormPageWrapper needBgSvg>
      <CompanyRegistration stage={stage} />
    </FormPageWrapper>
  );
}
