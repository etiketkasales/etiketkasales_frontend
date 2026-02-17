import QuoteStageContainer from "../stage-container";
import QuoteInputs from "../inputs";
import {
  IQuoteInput,
  quoteAccountantInputs,
  quoteDirectorInputs,
  quoteRequisitsInputs,
} from "~/src/entities/profile-section/model";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  changeData: IChangeableProfile;
  onInputChange: (v: string, field: keyof IChangeableProfile) => void;
  onBooleanChange: (v: boolean, field: keyof IChangeableProfile) => void;
  error: MessageI | null;
}

interface IInputsSection {
  title: string;
  inputs: IQuoteInput[];
}

const sections: IInputsSection[] = [
  {
    title: "Реквизиты",
    inputs: quoteRequisitsInputs,
  },
  {
    title: "Генеральный директор",
    inputs: quoteDirectorInputs,
  },
  {
    title: "Бухгалтер",
    inputs: quoteAccountantInputs,
  },
];

export default function QuoteRequisits({
  changeData,
  onInputChange,
  onBooleanChange,
  error,
}: Props) {
  return sections.map((section, i) => (
    <QuoteStageContainer key={`${i}-${section.title}`} title={section.title}>
      <QuoteInputs
        inputs={section.inputs}
        changeData={changeData}
        onChange={onInputChange}
        onBooleanChange={onBooleanChange}
        error={error}
      />
    </QuoteStageContainer>
  ));
}
