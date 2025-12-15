"use client";
import React from "react";
import { useRegisterCompany } from "~/src/entities/profile-section/lib/hooks";

import classes from "./draft.module.scss";
import ProfileContentContainer from "~/src/entities/profile-section/ui/content/container";
import QuoteAbout from "./about";
import Loader from "~/src/shared/ui/loader";
import QuoteButtons from "./buttons";
import QuoteRequisits from "./requisits";
import QuoteAgreement from "./agreement";
import {
  profileTitlesMap,
  quoteStageNumbers,
} from "~/src/entities/profile-section/model";

export default function QuoteDraft() {
  const {
    stage,
    setPrevStage,
    changeableUserInfo,
    onInputChange,
    onBooleanChange,
    loading,
    onSave,
    error,
  } = useRegisterCompany();

  const contentSwitcher = () => {
    const commonProps = {
      changeData: changeableUserInfo,
      onInputChange,
      error,
    };
    switch (stage) {
      default:
        return null;
      case "about":
        return <QuoteAbout {...commonProps} />;
      case "requisites":
        return (
          <QuoteRequisits {...commonProps} onBooleanChange={onBooleanChange} />
        );
      case "agreement":
        return <QuoteAgreement />;
    }
  };

  return (
    <ProfileContentContainer
      title={profileTitlesMap.quote}
      className={`flex-column relative ${classes.container}`}
    >
      {loading && <Loader radius={20} />}
      {contentSwitcher()}
      <QuoteButtons
        setPrevStage={setPrevStage}
        onSave={onSave}
        needBackButton={stage !== "about"}
        stageNumber={quoteStageNumbers[stage]}
        loading={loading}
      />
    </ProfileContentContainer>
  );
}
