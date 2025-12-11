import { useEffect } from "react";
import { useUserCompanies } from "~/src/features/user/lib/hooks/useUserCompanies.hook";

export const useCompanies = () => {
  const {
    companies,
    addCompany,
    handleDeleteCompany,
    handleGetCompanies,
    loading,
  } = useUserCompanies();

  useEffect(() => {
    handleGetCompanies();
  }, [handleGetCompanies]);

  return {
    addCompany,
    handleDeleteCompany,
    companies,
    loading,
  };
};
