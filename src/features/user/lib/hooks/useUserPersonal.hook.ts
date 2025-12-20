import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IProfile } from "../../model";

const personalFields: (keyof IProfile)[] = [
  "phone",
  "name",
  "surname",
  "email",
];

export const useUserPersonal = () => {
  const { userInfo } = useAppSelector(selectUser);
  const [hasPersonalData, setHasPersonalData] = useState<boolean>(false);

  const checkPersonalData = useCallback(() => {
    const isValid = personalFields.every((field) => {
      const value = userInfo?.[field];
      return !FormUtils.checkIfValueEmpty(value);
    });

    setHasPersonalData(isValid);
  }, [userInfo]);

  useEffect(() => {
    checkPersonalData();
  }, [checkPersonalData]);

  return hasPersonalData;
};
