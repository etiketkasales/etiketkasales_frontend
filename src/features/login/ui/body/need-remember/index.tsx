import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectUser,
  setNeedRemember,
} from "~/src/app/store/reducers/user.slice";

import CheckboxInput from "~/src/shared/ui/inputs/checkbox";

export default function NeedRememberCheckbox() {
  const dispatch = useAppDispatch();
  const { needRemember } = useAppSelector(selectUser);

  return (
    <CheckboxInput
      checked={needRemember}
      onChange={() => {
        dispatch(setNeedRemember(!needRemember));
      }}
      label="Запомнить меня"
      gap="10px"
    />
  );
}
