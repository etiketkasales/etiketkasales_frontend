import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { companyRegFieldsRequired } from "~/src/entities/company-registration/model";

export const useCheckRegInfo = () => {
  const { loaded } = useAppSelector(selectNavigation);
  const { userInfo, loadingData, isLoggedIn } = useAppSelector(selectUser);
  const [needRedirect, setNeedRedirect] = useState<boolean>(false);

  const profileReady = !isLoggedIn || userInfo.id > 0;

  useEffect(() => {
    if (!loaded || loadingData || !profileReady) {
      setNeedRedirect(false);
      return;
    }

    if (!isLoggedIn) {
      setNeedRedirect(false);
      return;
    }

    const hasErrors = FormUtils.getFormError({
      requiredFields: companyRegFieldsRequired,
      checkData: userInfo,
    });

    setNeedRedirect(hasErrors === null);
  }, [userInfo, loadingData, loaded, isLoggedIn, profileReady]);

  return {
    needRedirect,
    loading: !loaded || loadingData || !profileReady,
  };
};
