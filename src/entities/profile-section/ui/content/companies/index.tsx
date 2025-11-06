import React from "react";
import classNames from "classnames";
import { useCompanies } from "~/src/entities/profile-section/lib/hooks/useCompanies.hook";

import classes from "./companies.module.scss";
import ProfileContentContainer from "../container";
import ProfileCompany from "./item";
import AddCompanyButton from "./add-button";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

export default function ProfileCompanies() {
  const { companies, loading, addCompany, handleDeleteCompany } =
    useCompanies();

  return (
    <ProfileContentContainer
      title={profileTitlesMap.as_legal}
      className={classNames("flex-column relative", classes.container)}
      loading={loading}
    >
      {companies && companies.length > 0 ? (
        companies.map((item, index) => {
          return (
            <ProfileCompany
              key={`${item.id}-${index}`}
              {...item}
              onDelete={handleDeleteCompany}
              loading={loading}
            />
          );
        })
      ) : (
        <p className="text-body xl text-neutral-1000">
          Организации не добавлены
        </p>
      )}
      <AddCompanyButton onClick={() => {}} loading={loading} />
    </ProfileContentContainer>
  );
}
