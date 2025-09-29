import React from "react";
import LinkContainer from "~/src/shared/ui/link-container/ui";

export default function CityLabel() {
  return (
    <p className="gray-2 regular text-16 second-family">
      Я принимаю условия{" "}
      <LinkContainer link={"/contact-oferta"} className={"blue-link"}>
        Договора на подключение к Этикеткасейлс
      </LinkContainer>
    </p>
  );
}
