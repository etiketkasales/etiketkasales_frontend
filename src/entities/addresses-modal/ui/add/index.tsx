import React from "react";
import classNames from "classnames";

import classes from "./add.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import Button from "~/src/shared/ui/button";
import AddressModalSuggestions from "./suggestions";
import { AddressesModalStage } from "../../model";
import { ISuggestedAddress } from "~/src/features/user/model";

interface Props {
  stage: AddressesModalStage;
  newAddress: string;
  onInputChange: (v: string) => void;
  onButtonClick: () => void;
  suggestions: ISuggestedAddress[];
  suggestionsLoading: boolean;
  onSgnClick: (address: ISuggestedAddress) => void;
  sgnsOpen: boolean;
  setSgnsOpen: (b: boolean) => void;
}

export default function AddressesModalAdd({
  stage,
  newAddress,
  onInputChange,
  onButtonClick,
  suggestions,
  suggestionsLoading,
  onSgnClick,
  sgnsOpen,
  setSgnsOpen,
}: Props) {
  return (
    <div
      className={classNames(
        `flex-column gap-6 space-between`,
        classes.container,
        {
          [classes.active]: stage === "add",
          [classes.hidden]: stage === "default",
        },
      )}
    >
      <TextInput
        placeholder="Начните вводить адрес"
        onChange={(e) => onInputChange(e.target.value)}
        value={newAddress}
        wrapperClassName={classes.inputWrapper}
      >
        <AddressModalSuggestions
          suggestions={suggestions}
          onClick={(i) => {
            onSgnClick(i);
            setSgnsOpen(false);
          }}
          loading={suggestionsLoading}
          open={sgnsOpen}
        />
      </TextInput>
      <Button
        typeButton="yellow"
        onClick={onButtonClick}
        radius={12}
        className={classes.button}
      >
        <span className="heading h7 text-yellow-1000">Добавить</span>
      </Button>
    </div>
  );
}
