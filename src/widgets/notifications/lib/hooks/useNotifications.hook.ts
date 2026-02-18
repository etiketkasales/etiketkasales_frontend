import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  const disableModalClose = useCallback(
    ({ needTimeout }: { needTimeout: boolean }) => {
      dispatch(setNavigation({ modalCloseOnOutsideClick: false }));
      let timeout: ReturnType<typeof setTimeout>;
      if (needTimeout) {
        timeout = setTimeout(() => {
          dispatch(setNavigation({ modalCloseOnOutsideClick: true }));
        }, 1000);
      }
      return () => {
        if (timeout) clearTimeout(timeout);
      };
    },
    [dispatch],
  );

  const enableModalClose = useCallback(() => {
    dispatch(setNavigation({ modalCloseOnOutsideClick: true }));
  }, [dispatch]);

  return {
    disableModalClose,
    enableModalClose,
  };
};
