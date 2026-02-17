import classes from "../preview-avatar.module.scss";
import Icon from "~/public/profile/person-fill.svg";
import Container from "~/src/shared/ui/container/ui";
import Loader from "~/src/shared/ui/loader";

interface Props {
  loading: boolean;
  onClicK: () => void;
}

export default function NoImageAvatar({ loading, onClicK }: Props) {
  return (
    <Container
      bgColor={"yellow-200"}
      className={`${classes.noSrc} ${classes.container} pointer`}
      onClick={onClicK}
    >
      {loading && <Loader radius={100} />}
      <Icon />
    </Container>
  );
}
