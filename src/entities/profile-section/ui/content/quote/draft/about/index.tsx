import { Fragment, useEffect, useState } from "react";

import classes from "./about.module.scss";
import QuoteStageContainer from "../stage-container";
import QuoteInput from "../inputs/input";
import CompanyPartySuggest from "./company-party-suggest";
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
  const [heldPartyQuery, setHeldPartyQuery] = useState("");

  useEffect(() => {
    const q = (changeData.company_name ?? "").trim();
    if (heldPartyQuery && q !== heldPartyQuery) {
      setHeldPartyQuery("");
    }
  }, [changeData.company_name, heldPartyQuery]);

  return (
    <QuoteStageContainer title="Об организации" className={classes.container}>
      <div className="flex-column gap-2">
        {quoteAboutInputs.map((item, index) => (
          <Fragment key={`${index}-${item.field}-${item.placeholder}`}>
            <QuoteInput
              {...item}
              changeData={changeData}
              onChange={onInputChange}
              error={error}
              onInnLookupApplied={(name) => setHeldPartyQuery(name)}
            />
            {item.field === "company_name" ? (
              <CompanyPartySuggest
                query={(changeData.company_name as string) ?? ""}
                onChange={onInputChange}
                holdSearchWhileQueryEquals={heldPartyQuery}
                onUnlockSearch={() => setHeldPartyQuery("")}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </QuoteStageContainer>
  );
}
