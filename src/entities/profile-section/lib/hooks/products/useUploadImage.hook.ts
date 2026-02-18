import { uploadProductImage } from "../../api";

import { useCallback } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useFileLoad } from "~/src/shared/lib";

import { sellerProductsMessages } from "~/src/entities/profile-section/model";

export const useUploadImage = () => {
  const createNotification = useCreateNotification();
  const fileLoadingCallback = useCallback(
    async (file: File) => {
      if (!file) return null;
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadProductImage(formData);
      createNotification(sellerProductsMessages.fileUploaded, "success");
      return res;
    },
    [createNotification],
  );
  const { file, fileLoading, onFileLoad } = useFileLoad({
    callback: fileLoadingCallback,
  });

  return {
    file,
    fileLoading,
    onFileLoad,
  };
};
