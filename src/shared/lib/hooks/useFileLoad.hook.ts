import { useCallback, useState } from "react";
import { useFileResize } from "./useFileResize.hook";
import { promiseWrapper } from "../functions/shared.func";

interface Props {
  callback?: (file: File) => Promise<string>;
}

export const useFileLoad = ({ callback }: Props) => {
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const resizeFile = useFileResize();

  const validateFileSize = useCallback(
    (file: File) => {
      let newFile: File;
      const maxSizeInMB = 5;
      const maxSize = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSize) {
        newFile = resizeFile(file, maxSize);
        return newFile;
      }
      return null;
    },
    [resizeFile],
  );

  const onFileLoad = useCallback(
    async (file: File) => {
      await promiseWrapper({
        setLoading: setFileLoading,
        callback: async () => {
          const validatedFile = validateFileSize(file);
          const loadedFileName = await callback?.(validatedFile || file);
          setFileName(loadedFileName || null);
        },
      });
    },
    [callback, validateFileSize],
  );

  return {
    onFileLoad,
    fileName,
    fileLoading,
  };
};
