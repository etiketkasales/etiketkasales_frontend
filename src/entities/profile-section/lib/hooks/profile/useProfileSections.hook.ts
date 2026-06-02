import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";

const paramKey = "active_section";

interface Props {
  defaultSection: string;
  /** Если в URL скрытая вкладка — подменяем на defaultSection. */
  hiddenSections?: ProfileActionType[];
}

/**
 * useProfileSections - Hook for managing active section in profile.
 * @param {{ defaultSection: string }} - Object with default section.
 * @returns {{ activeSection: ProfileActionType | null, onItemClick: Function, exitSection: Function, loaded: boolean }} - Object with active section, onItemClick and exitSection functions and loaded flag.
 */
export const useProfileSections = ({
  defaultSection,
  hiddenSections = [],
}: Props) => {
  const { width } = useWindowSize();
  const { loaded } = useAppSelector(selectNavigation);

  const searchParams = useSearchParams();
  const updateParam = useUpdateSearchParams();

  const [activeSection, setActiveSection] = useState<ProfileActionType | null>(
    null,
  );

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
      if (hiddenSections.includes(activeSectionParam)) {
        setActiveSection(defaultSection as ProfileActionType);
        updateParamLocal(defaultSection);
        return;
      }
      setActiveSection(activeSectionParam);
    } else {
      if (width > 1024) {
        setActiveSection(defaultSection as ProfileActionType);
      } else {
        setActiveSection(null);
      }
    }
  }, [searchParams, defaultSection, width, hiddenSections, updateParamLocal]);

  return {
    activeSection,
    onItemClick,
    exitSection,
    loaded,
  };
};
