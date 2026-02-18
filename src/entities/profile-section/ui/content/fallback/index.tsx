import classNames from "classnames";

import classes from "./fallback.module.scss";
import ProfileContentContainer from "../container";

export default function ProfileContentFallback() {
  return (
    <ProfileContentContainer
      title="Никакой раздел не выбран"
      className={classNames(classes.container, "flex-column gap-5")}
    >
      <h6 className="heading h7 text-neutral-800">
        Попробуйте выбрать раздел или перезагрузить страницу
      </h6>
    </ProfileContentContainer>
  );
}
