import classes from "./header-default-media.module.scss";
import HeaderMediaMain from "./main";
import HeaderSearch from "../search";

interface Props {
  heightRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeaderMedia({ heightRef }: Props) {
  return (
    <>
      <HeaderMediaMain heightRef={heightRef} />
      <HeaderSearch className={classes.search} />
    </>
  );
}
