import classNames from "classnames";

import classes from "./user-company.module.scss";
import Container from "~/src/shared/ui/container/ui";
import CompanyContent from "./content";
import DeleteCompany from "./delete";
import { IUserCompany } from "~/src/features/user/model";

interface Props extends IUserCompany {
  loading?: boolean;
  as?: React.ElementType;
  onDelete?: (id: number) => void;
  needDeleteButton?: boolean;
}

export default function UserCompany({
  id,
  name,
  legal_address,
  inn,
  kpp,
  ogrn,
  onDelete,
  loading,
  needDeleteButton = false,
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
      {needDeleteButton && (
        <DeleteCompany onClick={() => onDelete?.(id)} loading={loading} />
      )}
    </Container>
  );
}
