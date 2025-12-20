import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { deleteNotification } from "~/src/app/store/reducers/notifications.slice";
import { useSwipeToDismiss } from "~/src/shared/lib";

interface Props {
  uuid: string;
}

export const useNotification = ({ uuid }: Props) => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(true);

  const onDelete = useCallback(() => {
    setIsActive(false);

    const timer = setTimeout(() => {
      dispatch(deleteNotification(uuid));
    }, 500);

    return () => clearTimeout(timer);
  }, [uuid, dispatch]);
  const { offsetX, handlers } = useSwipeToDismiss({
    onDismiss: (_) => onDelete(),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onDelete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDelete]);

  return {
    offsetX,
    handlers,
    isActive,
  };
};
