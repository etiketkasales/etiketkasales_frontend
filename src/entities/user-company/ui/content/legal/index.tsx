import React from "react";

import classes from "./legal.module.scss";
import Dot from "~/public/profile/dot.svg";

interface Props {
  data: {
    inn: string;
    kpp: string;
    ogrn: string;
  };
}

const labelsMap: Record<keyof Props["data"], string> = {
  inn: "ИНН",
  kpp: "КПП",
  ogrn: "ОГРН",
};

export default function CompanyLegal({ data }: Props) {
  return (
    <div className={`flex-row ${classes.container}`}>
      {Object.keys(data).map((item, index) => {
        const key = item as keyof Props["data"];
        return (
          <React.Fragment key={`${item}-${index}`}>
            {index !== 0 && <Dot />}
            <p className="text-body l text-neutral-800">
              {labelsMap[key]}: {data[key]}
            </p>
          </React.Fragment>
        );
      })}
    </div>
  );
}
