import { useEffect, useState } from "react";
import { useFileLoad } from "./useFileLoad.hook";

interface Props {
  callback?: (file: File) => Promise<string>;
}

export const useMultiFileLoad = ({ callback }: Props) => {
  const [files, setFiles] = useState<string[]>([]);
  const { fileLoading, fileName, onFileLoad } = useFileLoad({ callback });

  useEffect(() => {
    if (!fileName) return;
    if (fileLoading) return;
    setFiles((prev) => [...prev, fileName]);
  }, [fileName, fileLoading]);

  return {
    files,
    onFileLoad,
    fileLoading,
  };
};
