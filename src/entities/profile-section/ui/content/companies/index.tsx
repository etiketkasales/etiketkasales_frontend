"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { useCompanies } from "~/src/entities/profile-section/lib/hooks";

import classes from "./companies.module.scss";
import ProfileContentContainer from "../container";
import AddCompanyButton from "./add-button";
import AddCompanyModal from "~/src/entities/add-company-modal/ui";
import UserCompany from "~/src/entities/user-company/ui";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

export default function ProfileCompanies() {
  const { companies, loading, handleDeleteCompany } = useCompanies();
  const [addModal, setAddModal] = useState<boolean | null>(null);

  return (
    <>
      <ProfileContentContainer
        title={profileTitlesMap.as_legal}
        className={classNames("flex-column relative", classes.container)}
        loading={loading}
      >
        {companies && companies.length > 0 ? (
          companies.map((item, index) => {
            return (
              <UserCompany
                key={`${item.id}-${index}`}
                onDelete={handleDeleteCompany}
                loading={loading}
                as={"li"}
                needDeleteButton
                {...item}
              />
            );
          })
        ) : (
          <p className="text-body xl text-neutral-1000">
            Организации не добавлены
          </p>
        )}
        <AddCompanyButton onClick={() => setAddModal(true)} loading={loading} />
      </ProfileContentContainer>
      {addModal !== null && (
        <AddCompanyModal isOpen={addModal} onClose={() => setAddModal(false)} />
      )}
    </>
  );
}
