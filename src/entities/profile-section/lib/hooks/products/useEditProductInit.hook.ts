import { useEffect, useState } from "react";
import {
  editSellerProductSkeleton,
  IEditSellerProduct,
  ISellerProduct,
} from "~/src/entities/profile-section/model";

interface Props {
  initialData: ISellerProduct;
}

export const useEditProductInit = ({ initialData }: Props) => {
  const [editProductData, setEditProductData] = useState<IEditSellerProduct>(
    editSellerProductSkeleton,
  );

  useEffect(() => {
    if (!initialData) return;
    setEditProductData({
      name: initialData.name,
      description: initialData.description,
      price: initialData.price,
      status_code: initialData.status_code,
      images: initialData.images,
      image_upload_ids: [],
    });
  }, [initialData]);

  return {
    editProductData,
    setEditProductData,
  };
};
