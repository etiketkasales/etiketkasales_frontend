import { useEffect, useState } from "react";
import { useFileLoad } from "./useFileLoad.hook";

interface Props {
  callback?: (file: File) => Promise<number | null>;
}

export const useMultiFileLoad = ({ callback }: Props) => {
  const [files, setFiles] = useState<number[]>([]);
  const { fileLoading, fileId, onFileLoad } = useFileLoad({ callback });

  useEffect(() => {
    if (!fileId) return;
    if (fileLoading) return;
    setFiles((prev) => [...prev, fileId]);
  }, [fileId, fileLoading]);

  return {
    files,
    onFileLoad,
    fileLoading,
  };
};
