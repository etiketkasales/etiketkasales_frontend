import React from "react";
import classNames from "classnames";

import classes from "./company.module.scss";
import Container from "~/src/shared/ui/container/ui";
import CompanyContent from "./content";
import DeleteCompany from "./delete";
import { IUserCompany } from "~/src/features/user/model";

interface Props extends IUserCompany {
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function ProfileCompany({
  id,
  name,
  legal_address,
  inn,
  kpp,
  ogrn,
  onDelete,
  loading,
}: Props) {
  return (
    <Container
      as="li"
      bgColor={"neutral-300"}
      className={classNames(classes.container, "flex")}
    >
      <CompanyContent
        name={name}
        legal_address={legal_address}
        inn={inn}
        kpp={kpp}
        ogrn={ogrn}
      />
      <DeleteCompany onClick={() => onDelete(id)} loading={loading} />
    </Container>
  );
}
