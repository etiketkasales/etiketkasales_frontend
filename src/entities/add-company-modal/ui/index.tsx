import React from "react";
import { useAddCompany } from "../lib/hooks/useAddCompany.hook";

import classes from "./add-company.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import AddCompanyInputs from "./inputs";
import AddCompanyCheckBox from "./checkbox";
import AddCompanyButtons from "./buttons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCompanyModal({ isOpen, onClose }: Props) {
  const {
    newCompany,
    onChange,
    onSaveCompany,
    conditionsAccepted,
    setConditionsAccepted,
    error,
    specificError,
    loading,
  } = useAddCompany();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Добавьте компанию"}
      titleClassName={`${classes.title} heading h5 text-neutral-1000`}
      containerClassName={`flex-column ${classes.container}`}
      needBackButton={false}
      loading={loading}
    >
      <div className={`flex-column ${classes.content}`}>
        <p className="text-body l text-neutral-700">
          Укажите данные компании, которая будет оплачивать заказы
        </p>
        <AddCompanyInputs
          onChange={onChange}
          newCompany={newCompany}
          error={error}
          specificError={specificError}
        />
        <AddCompanyCheckBox
          checked={conditionsAccepted}
          onChange={setConditionsAccepted}
          error={specificError?.field === "checkbox"}
        />
        <AddCompanyButtons
          onClose={onClose}
          onSave={async () => await onSaveCompany()}
          disabled={loading || error !== null || specificError !== null}
        />
      </div>
    </Modal>
  );
}
