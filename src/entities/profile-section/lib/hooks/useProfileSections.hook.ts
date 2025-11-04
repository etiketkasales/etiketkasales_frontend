import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";
import { ProfileActionType } from "../../model/profile.interface";

const paramKey = "active_section";

interface Props {
  defaultSection: string;
}

export const useProfileSections = ({ defaultSection }: Props) => {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<ProfileActionType | null>(
    null,
  );
  const updateParam = useUpdateSearchParams();

  const updateParamLocal = useCallback(
    (value: string | null) => {
      updateParam({
        key: paramKey,
        value,
        action: "set",
        routerReplace: true,
      });
    },
    [updateParam],
  );

  const onItemClick = useCallback(
    (section: string) => {
      updateParamLocal(section);
    },
    [updateParamLocal],
  );

  const exitSection = useCallback(() => {
    updateParamLocal(null);
  }, [updateParamLocal]);

  useEffect(() => {
    const sectionParam = searchParams.get(paramKey);

    if (sectionParam) {
      const activeSectionParam = sectionParam as ProfileActionType;
      setActiveSection(activeSectionParam);
    } else {
      setActiveSection(null);
    }
  }, [activeSection, searchParams]);

  return {
    activeSection,
    onItemClick,
    exitSection,
  };
};
