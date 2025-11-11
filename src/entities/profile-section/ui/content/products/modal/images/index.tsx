import React, { useRef } from "react";

import classes from "./images.module.scss";
import ProductModalLoadButton from "./button";

interface Props {
  currentImages: string[];
  onFileLoad: (event: { target: HTMLInputElement }) => void;
  onRemove?: () => void;
}

export default function ProductsModalImages({
  currentImages,
  onFileLoad,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.container}>
      <input
        type="file"
        accept="image/*"
        hidden={true}
        multiple={false}
        onChange={(e) => {
          onFileLoad(e);
        }}
        ref={(refParam) => {
          if (inputRef === null || refParam === null) return;
          inputRef.current = refParam;
        }}
      />
      <ProductModalLoadButton onClick={() => inputRef.current?.click()} />
    </div>
  );
}
