import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";

import { useFileLoad } from "~/src/shared/lib/hooks";
import { useChangeUserData } from "./useChangeUserData.hook";
import { uploadAvatar } from "../../api";

export default function useChangeAvatar() {
  const dispatch = useAppDispatch();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const { file, onFileLoad, fileLoading } = useFileLoad({
    callback: async (data) => {
      if (!data) return null;
      const res = await uploadAvatar(data);
      return res;
    },
  });
  const { onSave } = useChangeUserData({ userInfo: changeableUserInfo });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file || !file.url) return;
    dispatch(
      setUser({
        changeableUserInfo: { ...changeableUserInfo, avatar: file.url },
      }),
    );
    onSave();
  }, [file, onSave, dispatch, changeableUserInfo]);

  return {
    inputRef,
    onFileLoad,
    fileLoading,
  };
}
