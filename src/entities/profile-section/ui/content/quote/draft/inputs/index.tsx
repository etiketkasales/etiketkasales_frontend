import QuoteInput from "./input";
import { IQuoteInput } from "~/src/entities/profile-section/model";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  inputs: IQuoteInput[];
  changeData: IChangeableProfile;
  onChange: (v: string, f: keyof IChangeableProfile) => void;
  onBooleanChange?: (v: boolean, f: keyof IChangeableProfile) => void;
  error: MessageI | null;
}

export default function QuoteInputs({
  inputs,
  onChange,
  onBooleanChange,
  changeData,
  error,
}: Props) {
  return (
    <div className="flex-column gap-2">
      {inputs.map((item, index) => (
        <QuoteInput
          key={`${index}-${item.placeholder}`}
          changeData={changeData}
          onChange={onChange}
          onBooleanChange={onBooleanChange}
          error={error}
          {...item}
        />
      ))}
    </div>
  );
}
