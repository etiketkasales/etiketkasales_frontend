import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectUser,
  setProfileAvatar,
} from "~/src/app/store/reducers/user.slice";
import { useFileLoad } from "~/src/shared/lib/hooks";
import { useChangeUserData } from ".";
import { uploadAvatar } from "~/src/entities/profile-section/lib/api";

/**
 * UseChangeAvatar is a hook that provides functionality for changing user's avatar.
 * It uses useFileLoad and useChangeUserData hooks from shared lib.
 * It takes no arguments and returns an object with inputRef, onFileLoad and fileLoading properties.
 * inputRef is a reference to an input element where the user can input their avatar.
 * onFileLoad is a function that calls a callback with the loaded file.
 * fileLoading is a boolean that indicates whether the file is being loaded.
 */
export default function useChangeAvatar() {
  const dispatch = useAppDispatch();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const { onFileLoad, fileLoading } = useFileLoad({
    callback: async (file: File) => {
      if (!file) return null;
      const data = new FormData();
      data.append("avatar", file);
      const res = await uploadAvatar(data);
      if (res.url) {
        dispatch(setProfileAvatar({ avatar: res.url }));
        onSave("Аватар изменён");
      }
      return res;
    },
  });
  const { onSave } = useChangeUserData({ userInfo: changeableUserInfo });

  const inputRef = useRef<HTMLInputElement>(null);

  return {
    inputRef,
    onFileLoad,
    fileLoading,
  };
}
