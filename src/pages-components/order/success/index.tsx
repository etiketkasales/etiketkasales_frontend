import PageWrapper from "~/src/entities/page-wrapper/ui";
import classes from "./success.module.scss";
import Container from "~/src/shared/ui/container/ui";

export default function OrderSuccessPage() {
  return (
    <PageWrapper>
      <Container className={`flex-column ${classes.container}`}></Container>
    </PageWrapper>
  );
}
