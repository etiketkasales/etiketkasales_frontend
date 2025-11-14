import React from "react";

import classes from "./inputs.module.scss";
import AddCompanyInput from "./input";
import { IUserCompanyBase } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";
import { addNewCompanyInputs } from "../../model";

interface Props {
  onChange: (
    v: string,
    field: keyof IUserCompanyBase,
    type: "string" | "number",
  ) => void;
  newCompany: IUserCompanyBase;
  error: MessageI | null;
  specificError: MessageI | null;
}

export default function AddCompanyInputs({
  onChange,
  newCompany,
  error,
  specificError,
}: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      {addNewCompanyInputs.map((item, index) => (
        <AddCompanyInput
          key={`${index}-${item.field}`}
          onChange={onChange}
          newCompany={newCompany}
          error={error}
          specificError={specificError}
          {...item}
        />
      ))}
    </div>
  );
}
