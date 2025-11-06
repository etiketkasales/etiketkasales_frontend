import React from "react";

import classes from "./content.module.scss";
import CompanyLegal from "./legal";

interface Props {
  name: string;
  legal_address: string;
  inn: string;
  kpp: string;
  ogrn: string;
}

export default function CompanyContent({
  name,
  legal_address,
  inn,
  kpp,
  ogrn,
}: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <h3 className="heading h5 text-neutral-800">{name}</h3>
      <p className="text-body xl text-neutral-800">{legal_address}</p>
      <CompanyLegal data={{ inn, kpp, ogrn }} />
    </div>
  );
}
