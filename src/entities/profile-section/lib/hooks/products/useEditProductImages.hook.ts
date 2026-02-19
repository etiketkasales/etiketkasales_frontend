import { Dispatch, SetStateAction, useEffect } from "react";
import { useUploadImage } from ".";

import { IEditSellerProduct } from "../../../model";

interface Props {
  setEditProductData: Dispatch<SetStateAction<IEditSellerProduct>>;
}

export const useEditProductImages = ({ setEditProductData }: Props) => {
  const { file, fileLoading, onFileLoad } = useUploadImage();

  useEffect(() => {
    if (file) {
      setEditProductData((prev) => ({
        ...prev,
        images: [...prev.images, file.url],
        image_upload_ids: [...prev.image_upload_ids, file.upload_id],
      }));
    }
  }, [file]);

  return {
    file,
    fileLoading,
    onFileLoad,
  };
};
