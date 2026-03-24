import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useAsyncFn } from "~/src/shared/lib";

import { setNavigation } from "~/src/app/store/reducers/navigation.slice";
import { getAddressSuggestions } from "~/src/entities/address-input/lib/api";

import { IAddressSuggestionResponse } from "~/src/features/user/model";

interface Props {
  defaultValue: string;
}

export const useAddressSuggestions = ({ defaultValue }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, promise } = useAsyncFn();
  const normalizedDefault = defaultValue ?? "";
  const [searchQuery, setSearchQuery] = useState<string>(normalizedDefault);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<IAddressSuggestionResponse[]>(
    [],
  );
  const skipNextRequest = useRef<boolean>(false);

  const firstDefaultValue = useRef<string>(normalizedDefault);
  const lastExternalValue = useRef<string>(normalizedDefault);

  useEffect(() => {
    const next = defaultValue ?? "";
    if (next !== lastExternalValue.current) {
      lastExternalValue.current = next;
      firstDefaultValue.current = next;
      setSearchQuery(next);
    }
  }, [defaultValue]);

  const getSuggestions = useCallback(
    async (q: string) => {
      await promise(async () => {
        const res = await getAddressSuggestions(q);
        setSuggestions(res || []);
        setIsOpened(true);
      });
    },
    [promise],
  );

  const onItemClick = useCallback(
    (
      address: IAddressSuggestionResponse,
      callback: (a: IAddressSuggestionResponse) => void,
    ) => {
      callback(address);
      setSearchQuery(address.label);
      setIsOpened(false);
      skipNextRequest.current = true;
    },
    [dispatch],
  );

  const preventModalClose = useCallback(() => {
    dispatch(
      setNavigation({
        modalCloseOnOutsideClick: false,
      }),
    );
    const timeout = setTimeout(() => {
      dispatch(
        setNavigation({
          modalCloseOnOutsideClick: true,
        }),
      );
      clearTimeout(timeout);
    }, 500);
  }, [dispatch]);

  useDebounce(
    async () => {
      if (searchQuery === firstDefaultValue.current) return;
      if (searchQuery.trim().length >= 3) {
        if (skipNextRequest.current) {
          skipNextRequest.current = false;
          return;
        }
        await getSuggestions(searchQuery);
      }
    },
    500,
    [searchQuery],
  );

  return {
    loading,
    suggestions,
    isOpened,
    setIsOpened,
    getSuggestions,
    searchQuery,
    setSearchQuery,
    onItemClick,
    preventModalClose,
  };
};
