"use client";
import { useAddressSuggestions } from "~/src/entities/address-input/lib/hooks";

import TextInput from "~/src/shared/ui/inputs/text-input";
import AddressInputSuggestions from "./suggestions";
import { IAddressSuggestionResponse } from "~/src/features/user/model";
import { usePortalDropdown } from "~/src/shared/lib";

interface Props {
  onSuggestionClick: (s: IAddressSuggestionResponse) => void;
  classNameSuggestions?: string;
  inputPlaceholder?: string;
}

export default function AddressInput({
  onSuggestionClick,
  classNameSuggestions,
  inputPlaceholder,
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
  } = useAddressSuggestions();
  const { anchorRef, portalStyle } = usePortalDropdown<HTMLInputElement>({
    isOpen: sgnsOpen,
    gap: 8,
  });

  return (
    <TextInput
      placeholder={inputPlaceholder ?? "Начните вводить адрес"}
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
      separatedPlaceholder={false}
      wrapperRef={anchorRef}
      name="delivery-address"
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
