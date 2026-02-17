import classNames from "classnames";

import classes from "./suggestion.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { ISuggestedAddress } from "~/src/features/user/model";

interface Props {
  suggestions: ISuggestedAddress[];
  onClick: (address: ISuggestedAddress) => void;
  loading: boolean;
  open: boolean;
}

export default function AddressModalSuggestions({
  suggestions,
  onClick,
  loading,
  open,
}: Props) {
  return (
    <Container
      className={classNames(`flex-column gap-2 scrollbar`, classes.container, {
        [classes.active]:
          open && Array.isArray(suggestions) && suggestions.length > 0,
      })}
      role="list"
    >
      {loading && <div className={classes.loader}></div>}
      {suggestions.map((item, index) => (
        <div
          key={`${index}-${item.id}`}
          className={`${classes.item} pointer`}
          role="listitem"
          onClick={() => {
            if (!loading) onClick(item);
          }}
        >
          <span className={`text-body base text-neutral-1000 ${classes.text}`}>
            {item.full_address}
          </span>
        </div>
      ))}
    </Container>
  );
}
