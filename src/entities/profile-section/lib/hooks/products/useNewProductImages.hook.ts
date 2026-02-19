import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFileLoad } from "~/src/shared/lib";
import { uploadProductImage } from "~/src/entities/profile-section/lib/api";

import {
  INewProduct,
  INewProductCurrentImage,
} from "~/src/entities/profile-section/model";

interface Props {
  setNewProduct: Dispatch<SetStateAction<INewProduct>>;
}

export const useNewProductImages = ({ setNewProduct }: Props) => {
  const [currentImages, setCurrentImages] = useState<INewProductCurrentImage[]>(
    [],
  );

  const fileUploadCallback = useCallback(
    async (file: File, fileBinary?: string) => {
      if (!file) return null;
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadProductImage(formData);
      if (fileBinary) {
        setCurrentImages((prev) => [
          ...prev,
          {
            upload_id: res.upload_id,
            url: res.url,
            fileBinary,
          },
        ]);
      }
      return res;
    },
    [],
  );

  const { onFileLoad, fileLoading } = useFileLoad({
    callback: fileUploadCallback,
  });

  const onDeleteImage = useCallback((image: INewProductCurrentImage) => {
    setCurrentImages((prev) =>
      prev.filter((i) => i.upload_id !== image.upload_id),
    );
    setNewProduct((n) => ({
      ...n,
      image_upload_ids: n.image_upload_ids.filter(
        (id: number) => id !== image.upload_id,
      ),
      images: n.images.filter((i) => i !== image.url),
    }));
  }, []);

  useEffect(() => {
    setNewProduct((n) => ({
      ...n,
      image_upload_ids: [...new Set(currentImages.map((i) => i.upload_id))],
      images: [...new Set(currentImages.map((i) => i.url))],
    }));
  }, [currentImages]);

  return {
    onFileLoad,
    fileLoading,
    onDeleteImage,
    currentImages,
  };
};
