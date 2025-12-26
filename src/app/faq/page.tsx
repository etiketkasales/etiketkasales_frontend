import { getLegalPage } from "~/src/entities/legal-page/lib/utils";

import LegalPage from "~/src/entities/legal-page/ui";
import { legalPageSkeleton } from "~/src/entities/legal-page/model";

export default async function Page() {
  const pageData = await getLegalPage("faq");
  const props = pageData || legalPageSkeleton;

  return <LegalPage {...props} />;
}
