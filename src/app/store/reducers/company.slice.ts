import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { RegistrationStageT } from "~/src/entities/company-registration/model/company-registration.interface";
import { CompanyI } from "~/src/features/company/model/company.interface";
import { companyS } from "~/src/features/company/model/company.skeleton";

interface InitialStateI {
  stage: RegistrationStageT;
  nextStage: RegistrationStageT | null;
  companyData: CompanyI;
  [key: string]: any;
}

const nextStagesRecord: Record<RegistrationStageT, RegistrationStageT | null> =
  {
    personal: "status",
    status: "name",
    name: "city",
    city: null,
  };

const initialState: InitialStateI = {
  stage: "personal",
  companyData: companyS,
  nextStage: nextStagesRecord["personal"],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setStage: (state, action: PayloadAction<RegistrationStageT>) => {
      state.stage = action.payload;
      state.nextStage = nextStagesRecord[action.payload];
    },
    setCompanyData: (state, action: PayloadAction<CompanyI>) => {
      state.companyData = merge({}, state.companyData, action.payload);
    },
    setCompany: (state, action: PayloadAction<Partial<InitialStateI>>) => {
      let key: keyof InitialStateI;
      const valueArg = action.payload;
      for (key in valueArg) {
        if (
          Object.hasOwnProperty.call(valueArg, key) &&
          Object.hasOwnProperty.call(state, key)
        ) {
          state[key] = valueArg[key];
        }
      }
    },
  },
});

export const { setStage, setCompanyData, setCompany } = companySlice.actions;
export const selectCompany = (state: { company: InitialStateI }) =>
  state.company;
export default companySlice.reducer;
