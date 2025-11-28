import { useCallback, useState } from "react";
import { useFileResize } from "./useFileResize.hook";
import { promiseWrapper } from "../functions/shared.func";

interface Props {
  callback?: (file: File) => Promise<number | null>;
  maxSizeInMBProp?: number;
}

export const useFileLoad = ({ callback, maxSizeInMBProp }: Props) => {
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [fileId, setFileId] = useState<number | null>(null);
  const resizeFile = useFileResize();

  const validateFileSize = useCallback(
    (file: File) => {
      let newFile: File;
      const maxSizeInMB = 5;
      const maxSize = (maxSizeInMBProp ?? maxSizeInMB) * 1024 * 1024;

      if (file.size > maxSize) {
        newFile = resizeFile(file, maxSize);
        return newFile;
      }
      return null;
    },
    [resizeFile, maxSizeInMBProp],
  );

  const onFileLoad = useCallback(
    async (file: File) => {
      await promiseWrapper({
        setLoading: setFileLoading,
        callback: async () => {
          const validatedFile = validateFileSize(file);
          const loadedFileId = await callback?.(validatedFile || file);
          setFileId(loadedFileId || null);
        },
      });
    },
    [callback, validateFileSize],
  );

  return {
    onFileLoad,
    fileId,
    fileLoading,
  };
};
