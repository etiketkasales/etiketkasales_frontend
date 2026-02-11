import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { MessageType } from "~/src/shared/model";

export const useCreateNotification = () => {
  const dispatch = useAppDispatch();

  const createNotification = useCallback(
    (msg: string, type?: MessageType) => {
      dispatch(
        addNotification({
          message: msg,
          type: type || "error",
          field: "global",
        }),
      );
    },
    [dispatch],
  );

  return createNotification;
};
