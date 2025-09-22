"use client";
import React from "react";
import { useLocation } from "../../../lib/hooks/useLocation.hook";

import GeoAlt from "~/public/shared/geo-alt.svg";
import Select from "~/src/shared/ui/select/ui";

interface Props {
  action: () => void;
}

export default function HeaderTopLocation({ action }: Props) {
  const { currentOption, setCurrentOption } = useLocation();
  return (
    <section className="flex-row gap-1 relative">
      <GeoAlt />
      <Select
        selectOptions={["Москва", "Санкт-Петербург"]}
        currentOption={currentOption}
        renderItem={(item, index) => {
          return (
            <div key={index} onClick={() => setCurrentOption(item)}>
              <span className="text-14 black semibold second-family max-content nowrap-text">
                {item}
              </span>
            </div>
          );
        }}
        holder="Москва"
        optionsPosTop={16}
        containerRelative={false}
        selectedOptionClassName="text-14 black semibold second-family"
        optionsClassName="yellow-container radius-20 padding-8"
      />
    </section>
  );
}
