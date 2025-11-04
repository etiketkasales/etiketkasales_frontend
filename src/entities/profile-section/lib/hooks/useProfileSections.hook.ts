import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWindowSize } from "react-use";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

const paramKey = "active_section";

interface Props {
  defaultSection: string;
}

export const useProfileSections = ({ defaultSection }: Props) => {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const updateParam = useUpdateSearchParams();
  const { width } = useWindowSize();

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
      setActiveSection(sectionParam);
    } else {
      setActiveSection(null);
    }
  }, [activeSection, searchParams]);

  useEffect(() => {
    if (width <= 768) {
      updateParamLocal(null);
    } else {
      if (activeSection) return;
      updateParamLocal(defaultSection);
    }
  }, [width, activeSection, defaultSection, updateParamLocal]);

  return {
    activeSection,
    onItemClick,
    exitSection,
  };
};
