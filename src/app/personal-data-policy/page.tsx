import { getLegalPage } from "~/src/entities/legal-page/lib/utils";

import LegalPage from "~/src/entities/legal-page/ui";
import { legalPageSkeleton } from "~/src/entities/legal-page/model";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const pageData = await getLegalPage("personal-data-policy");
    const props = pageData || legalPageSkeleton;

    return <LegalPage {...props} />;
  } catch (error) {
    console.error("Failed to load legal page:", error);

    return <LegalPage {...legalPageSkeleton} />;
  }
}
