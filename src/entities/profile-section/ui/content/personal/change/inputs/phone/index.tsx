import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./phone.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  phone: string;
}

export default function ProfilePhone({ phone }: Props) {
  return (
    <Container
      bgColor={"neutral-300"}
      className={`${classes.container} flex-column flex-start`}
    >
      <span className="text-body xs text-neutral-700">Телефон</span>
      <p className="text-body l text-neutral-900">
        {StringUtils.formatPhone(phone)}
      </p>
    </Container>
  );
}
