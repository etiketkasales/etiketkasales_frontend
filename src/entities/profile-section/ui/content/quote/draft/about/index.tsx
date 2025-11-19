import React from "react";

import classes from "./about.module.scss";
import QuoteStageContainer from "../stage-container";
import QuoteInputs from "../inputs";
import { IChangeableProfile } from "~/src/features/user/model";
import { quoteAboutInputs } from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  changeData: IChangeableProfile;
  onInputChange: (v: string, field: keyof IChangeableProfile) => void;
  error: MessageI | null;
}

export default function QuoteAbout({
  changeData,
  onInputChange,
  error,
}: Props) {
  return (
    <QuoteStageContainer title="Об организации" className={classes.container}>
      <QuoteInputs
        inputs={quoteAboutInputs}
        changeData={changeData}
        onChange={onInputChange}
        error={error}
      />
    </QuoteStageContainer>
  );
}
