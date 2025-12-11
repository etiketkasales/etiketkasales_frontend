"use callback";
import React, { useRef } from "react";

import classes from "./images.module.scss";
import ProductModalLoadButton from "./button";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import FileInput from "~/src/shared/ui/inputs/file";
import { MessageI } from "~/src/shared/model";

interface Props {
  currentImages: string[];
  onFileLoad: (file: File) => void;
  error: MessageI | null;
}

export default function ProductsModalImages({
  currentImages,
  onFileLoad,
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onFileLoad(file);
  };

  return (
    <div className={classes.container}>
      {currentImages.length > 0 && (
        <ImageWrapper
          src={currentImages[0]}
          width={160}
          height={160}
          className={classes.image}
        >
          {currentImages.length > 1 && (
            <p className={`text-neutral-1000 text-body l ${classes.length}`}>
              + {currentImages.length - 1}
            </p>
          )}
        </ImageWrapper>
      )}
      <FileInput onChange={handleFileChange} ref={inputRef} />
      <ProductModalLoadButton
        onClick={() => inputRef.current?.click()}
        error={error}
      />
    </div>
  );
}
