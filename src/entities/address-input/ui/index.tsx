"use client";
import { useAddressSuggestions } from "~/src/entities/address-input/lib/hooks";
import { usePortalDropdown } from "~/src/shared/lib";

import TextInput, { TextInputProps } from "~/src/shared/ui/inputs/text-input";
import AddressInputSuggestions from "./suggestions";
import { IAddressSuggestionResponse } from "~/src/features/user/model";

interface Props extends TextInputProps {
  onSuggestionClick: (s: IAddressSuggestionResponse) => void;
  classNameSuggestions?: string;
  inputPlaceholder?: string;
  defaultValue?: string;
}

export default function AddressInput({
  onSuggestionClick,
  classNameSuggestions,
  inputPlaceholder,
  placeholder,
  name,
  defaultValue,
  ...rest
}: Props) {
  const {
    isOpened: sgnsOpen,
    setIsOpened,
    searchQuery,
    setSearchQuery,
    onItemClick,
    loading,
    suggestions,
    preventModalClose,
  } = useAddressSuggestions({ defaultValue: defaultValue || "" });
  const { anchorRef, portalStyle } = usePortalDropdown<HTMLInputElement>({
    isOpen: sgnsOpen,
    gap: 8,
  });

  return (
    <TextInput
      {...rest}
      placeholder={inputPlaceholder ?? placeholder ?? "Начните вводить адрес"}
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
      wrapperRef={anchorRef}
      name={name || "delivery-address"}
    >
      <AddressInputSuggestions
        suggestions={suggestions}
        onItemClick={(i) => {
          onItemClick(i, onSuggestionClick);
        }}
        loading={loading}
        isOpened={sgnsOpen}
        setIsOpened={(b) => setIsOpened(b)}
        className={classNameSuggestions}
        portalStyle={portalStyle}
        preventModalClose={preventModalClose}
      />
    </TextInput>
  );
}
