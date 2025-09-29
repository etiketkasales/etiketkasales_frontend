import React, { useMemo } from "react";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface ILink {
  title: string;
  href: string;
}

const Link = ({ title, href }: ILink) => {
  return (
    <LinkContainer link={href} className={"blue-link"}>
      {title}
    </LinkContainer>
  );
};

export default function PersonalLabel() {
  return (
    <p className="gray-2 regular text-16 second-family">
      Я соглашаюсь с правилами и условиями, указанными в{" "}
      <Link title="Пользовательском соглашении" href="/personal-policy" />, и
      разрешаю использовать и обрабатывать мои личные данные в соответствии с{" "}
      <Link title="Политикой конфиденциальности" href="/privacy-policy" />
    </p>
  );
}
