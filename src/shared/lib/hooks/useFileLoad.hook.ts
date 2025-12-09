import { useCallback, useState } from "react";
import { useFileResize } from "./useFileResize.hook";
import { promiseWrapper } from "../functions/shared.func";
import { IFileUploadRes } from "../../model";

interface Props {
  callback?: (fileBinary: string) => Promise<IFileUploadRes | null>;
  maxSizeInMBProp?: number;
}

export const useFileLoad = ({ callback, maxSizeInMBProp }: Props) => {
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [file, setFile] = useState<IFileUploadRes | null>(null);
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

  const readFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        resolve(fileReader.result?.toString() || "");
      };

      fileReader.onerror = reject;

      fileReader.readAsDataURL(file);
    });
  }, []);

  const onFileLoad = useCallback(
    async (file: File) => {
      await promiseWrapper({
        setLoading: setFileLoading,
        callback: async () => {
          const fileBinary = await readFile(file);
          if (!fileBinary) return;
          const loadedFile = await callback?.(fileBinary);
          setFile(loadedFile || null);
        },
      });
    },
    [callback, readFile],
  );

  return {
    onFileLoad,
    file,
    fileLoading,
  };
};
