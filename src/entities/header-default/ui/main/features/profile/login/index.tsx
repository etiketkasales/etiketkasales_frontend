import classes from "./header-login.module.scss";
import Icon from "~/public/header/person-gray.svg";
import LinkContainer from "~/src/shared/ui/link-container/ui";

export default function HeaderLogin() {
  return (
    <LinkContainer
      link="/login"
      className={`flex-row gap-6px align-center ${classes.container}`}
    >
      <Icon />
      <span className="text-body l text-neutral-700">Войти</span>
    </LinkContainer>
  );
}
