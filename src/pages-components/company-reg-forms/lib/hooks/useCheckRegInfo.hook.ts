import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { companyRegFieldsRequired } from "~/src/entities/company-registration/model/company-registration.const";

export const useCheckRegInfo = () => {
  const { loaded } = useAppSelector(selectNavigation);
  const { userInfo, loadingData } = useAppSelector(selectUser);
  const [needRedirect, setNeedRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      const hasErrors = FormUtils.getFormError({
        requiredFields: companyRegFieldsRequired,
        checkData: userInfo,
      });
      if (hasErrors === null) {
        setNeedRedirect(true);
      }
    }

    return () => setNeedRedirect(false);
  }, [userInfo]);

  return {
    needRedirect,
    loading: !loaded || loadingData,
  };
};
