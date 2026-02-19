"use client";
import { useRef } from "react";

import classes from "./images.module.scss";
import FileInput from "~/src/shared/ui/inputs/file";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import Button from "~/src/shared/ui/button";
import { MessageI } from "~/src/shared/model";

interface Props {
  imagePreview: string;
  onFileUpload: (file: File) => Promise<void>;
  loading: boolean;
  error: MessageI | null;
}

export default function EditProductImage({
  imagePreview,
  onFileUpload,
  loading,
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasError =
    error && (error.field === "images" || error.field === "image_upload_ids");

  return (
    <div
      className={`flex ${classes.container}`}
      onClick={() => {
        if (loading) return;
        inputRef.current?.click();
      }}
    >
      <FileInput
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onFileUpload(file);
        }}
        ref={inputRef}
      />
      <ImageWrapper
        src={imagePreview}
        width={160}
        height={160}
        className={classes.image}
      />
      <Button typeButton="ghost" disabled={loading}>
        <span
          className={`text-body l text-${hasError ? "red-700" : "neutral-700"} underline`}
        >
          Изменить фото товара
        </span>
      </Button>
    </div>
  );
}
