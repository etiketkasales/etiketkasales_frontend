import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationStageT } from "~/src/entities/company-registration/model/company-registration.interface";

interface InitialStateI {
  stage: RegistrationStageT;
  nextStage: RegistrationStageT | null;
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

export const { setStage, setCompany } = companySlice.actions;
export const selectCompany = (state: { company: InitialStateI }) =>
  state.company;
export default companySlice.reducer;
