import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useFileLoad } from "~/src/shared/lib/hooks";
import { useChangeUserData } from ".";

import { uploadAvatar } from "~/src/entities/profile-section/lib/api";
import { selectUser } from "~/src/app/store/reducers/user.slice";

/**
 * @hook useChangeAvatar
 * @description Hook for changing user avatar
 * @param {void}
 * @return {{inputRef: React.MutableRefObject<HTMLInputElement>, onFileLoad: (file: File) => void, fileLoading: boolean}}
 */
export const useChangeAvatar = () => {
  const dispatch = useAppDispatch();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const { onSave } = useChangeUserData({});

  const fileLoadCallback = useCallback(
    async (file: File) => {
      if (!file) return null;
      const data = new FormData();
      data.append("avatar", file);
      const res = await uploadAvatar(data);
      if (res.url) {
        await onSave("Аватар изменён", {
          ...changeableUserInfo,
          avatar: res.url,
        });
      }
      return res;
    },
    [changeableUserInfo, dispatch, onSave],
  );

  const { onFileLoad, fileLoading } = useFileLoad({
    callback: fileLoadCallback,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return {
    inputRef,
    onFileLoad,
    fileLoading,
  };
};
