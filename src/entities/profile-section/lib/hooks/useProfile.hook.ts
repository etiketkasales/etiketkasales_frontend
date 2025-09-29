import { useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import FormUtils from "~/src/shared/lib/utils/form.util";
import InputUtils from "~/src/shared/lib/utils/input.util";

import { MessageI } from "~/src/shared/model/shared.interface";
import { IChangeUserData } from "~/src/entities/profile-section/model/profile.interface";
import { changeDataS } from "../../model/profile.const";

export const useProfile = () => {
  const { userInfo } = useAppSelector(selectUser);
  const { handleGetUser } = useGetUser();
  const [changeData, setChangeData] = useState<IChangeUserData>(changeDataS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);

  const handleChangeData = (v: string, field: keyof IChangeUserData) => {
    setChangeData({ ...changeData, [field]: v });
  };

  const validateEmail = (email: string) => {
    if (!changeData.email) return false;
    if (!InputUtils.isValidEmail(email)) return false;
    return true;
  };

  const validFields = () => {
    if (
      !FormUtils.isAllFieldsEmpty({
        checkData: changeData,
      })
    ) {
      return false;
    }

    if (!validateEmail(changeData.email)) return false;
    return true;
  };

  const handleButtonClick = async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        setLoading(true);
        if (!validFields()) return;
        if (!userInfo.id) return;
        await handleGetUser();
      },
      setError,
    });
  };

  return {
    handleChangeData,
    changeData,
    userInfo,
    handleButtonClick,
    loading,
    error,
  };
};
