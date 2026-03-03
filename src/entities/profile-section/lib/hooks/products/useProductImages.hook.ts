import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFileLoad } from "~/src/shared/lib";
import { uploadProductImage } from "~/src/entities/profile-section/lib/api";

import { IProductCurrentImage } from "~/src/entities/profile-section/model";

interface IImage {
  image_upload_ids: number[];
  images: string[];
}

interface Props<ProductType extends IImage> {
  setProduct: Dispatch<SetStateAction<ProductType>>;
  initialImages?: string[];
}

export const useProductImages = <ProductType extends IImage>({
  setProduct,
  initialImages,
}: Props<ProductType>) => {
  const [currentImages, setCurrentImages] = useState<IProductCurrentImage[]>(
    [],
  );

  const syncProduct = useCallback(
    (images: IProductCurrentImage[]) => {
      setProduct((p) => ({
        ...p,
        images: images.map((i) => i.url),
        image_upload_ids: images
          .filter((i) => i.upload_id)
          .map((i) => i.upload_id as number),
      }));
    },
    [setProduct],
  );

  const fileUploadCallback = useCallback(
    async (file: File, fileBinary?: string) => {
      if (!file) return null;

      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadProductImage(formData);

      if (fileBinary) {
        setCurrentImages((prev) => {
          const updated = [
            ...prev,
            {
              upload_id: res.upload_id,
              url: res.url,
              fileBinary,
            },
          ];
          syncProduct(updated);
          return updated;
        });
      }

      return res;
    },
    [syncProduct],
  );

  const { onFileLoad, fileLoading } = useFileLoad({
    callback: fileUploadCallback,
  });

  const onDeleteImage = useCallback(
    (url: string) => {
      setCurrentImages((prev) => {
        const updated = prev.filter((i) => i.url !== url);
        syncProduct(updated);
        return updated;
      });
    },
    [syncProduct],
  );

  const clearImages = useCallback(() => {
    setCurrentImages([]);
  }, []);

  useEffect(() => {
    if (currentImages.length) return;
    setCurrentImages(
      initialImages ? initialImages.map((url) => ({ url })) : [],
    );
  }, [initialImages, currentImages.length]);

  return {
    onFileLoad,
    fileLoading,
    onDeleteImage,
    currentImages,
    setCurrentImages,
    clearImages,
  };
};
