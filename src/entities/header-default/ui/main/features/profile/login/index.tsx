import classNames from "classnames";
import classes from "./header-login.module.scss";
import Icon from "~/public/header/person-gray.svg";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import Loader from "~/src/shared/ui/loader";

interface Props {
  loading: boolean;
}

export default function HeaderLogin({ loading }: Props) {
  return (
    <LinkContainer
      link="/login"
      className={classNames(
        `flex-row gap-6px align-center`,
        classes.container,
        loading && `relative ${classes.loading}`,
      )}
    >
      {loading && <Loader radius={20} size={15} />}
      <Icon />
      <span className="text-body l text-neutral-700">Войти</span>
    </LinkContainer>
  );
}
