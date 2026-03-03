"use client";
import { useRef } from "react";
import classNames from "classnames";

import classes from "./product-images-editor.module.scss";
import ProductImagesEditorButton from "./button";
import FileInput from "~/src/shared/ui/inputs/file";

interface Props<ImageType> {
  images: ImageType[];
  renderImage: (image: ImageType, index: number) => React.ReactNode;
  onFileLoad: (file: File) => void;
  loading?: boolean;
  error?: boolean;
  containerClassName?: string;
  imagesListClassName?: string;
}

export default function ProductImagesEditor<ImageType>({
  images,
  renderImage,
  onFileLoad,
  loading,
  error,
  containerClassName,
  imagesListClassName,
}: Props<ImageType>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={classNames("flex", containerClassName)}>
      <ProductImagesEditorButton
        onClick={() => inputRef.current?.click()}
        error={error}
        disabled={loading}
      />
      {Array.isArray(images) && images.length ? (
        <div
          className={classNames(
            imagesListClassName,
            classes.images,
            "flex-row align-center scrollbar mandatory-x-container",
          )}
        >
          {images.map((item, index) => renderImage(item, index))}
        </div>
      ) : null}
      <FileInput
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onFileLoad(file);
        }}
        ref={inputRef}
      />
    </div>
  );
}
