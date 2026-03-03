import classes from "./first-stage.module.scss";
import ProductsModalMainInputs from "./main-inputs";
import NewProductModalStage from "..";
import ProductImagesEditor from "~/src/entities/product-images-editor/ui";
import { MessageI } from "~/src/shared/model";
import {
  INewProduct,
  IProductCurrentImage,
} from "~/src/entities/profile-section/model";
import ProductsModalImage from "./image";

interface Props {
  modalStage: number;
  onFileLoad: (file: File) => Promise<void>;
  currentImages: IProductCurrentImage[];
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
  error: MessageI | null;
  loading: boolean;
  onDeleteImage: (key: string) => void;
}

const imagesErrorFields = ["images", "image_upload_ids"];

export default function NewProductFirstStage({
  modalStage,
  onFileLoad,
  currentImages,
  onInputChange,
  newProduct,
  error,
  loading,
  onDeleteImage,
}: Props) {
  return (
    <NewProductModalStage
      isActive={modalStage === 1}
      className={`flex-column gap-6`}
    >
      <ProductImagesEditor
        onFileLoad={onFileLoad}
        images={currentImages}
        error={error !== null && imagesErrorFields.includes(error.field || "")}
        loading={loading}
        containerClassName={classes.images}
        imagesListClassName={classes.imagesList}
        renderImage={(item, index) => (
          <ProductsModalImage
            key={`${item.upload_id}=${index}`}
            deleteKey={item.url}
            src={item.fileBinary ?? item.url}
            onDeleteImage={onDeleteImage}
          />
        )}
      />
      <ProductsModalMainInputs
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
      />
    </NewProductModalStage>
  );
}
