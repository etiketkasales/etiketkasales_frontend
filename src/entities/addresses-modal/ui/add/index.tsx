import classNames from "classnames";

import classes from "./add.module.scss";
import Button from "~/src/shared/ui/button";
import AddressInput from "~/src/entities/address-input/ui";
import { AddressesModalStage } from "../../model";
import { IAddressSuggestionResponse } from "~/src/features/user/model";

interface Props {
  stage: AddressesModalStage;
  onButtonClick: () => void | Promise<void>;
  onSgnClick: (address: IAddressSuggestionResponse) => void;
}

export default function AddressesModalAdd({
  stage,
  onButtonClick,
  onSgnClick,
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
      <AddressInput
        onSuggestionClick={onSgnClick}
        classNameSuggestions={classes.suggestions}
      />
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
