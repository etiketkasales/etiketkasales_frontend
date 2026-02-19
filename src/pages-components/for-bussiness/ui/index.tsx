import ForBussinessSection from "~/src/entities/for-bussiness/ui";
import HeaderWithText from "~/src/entities/header-with-text/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";

export default function ForBussinessPage() {
  return (
    <PageWrapper CustomHeader={<HeaderWithText text="Для бизнеса" />}>
      <ForBussinessSection />
    </PageWrapper>
  );
}
