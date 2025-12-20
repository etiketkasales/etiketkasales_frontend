import classes from "./error.module.scss";
import Container from "~/src/shared/ui/container/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import OrderErrorHeading from "./heading";
import OrderErrorButtons from "./buttons";

export default function OrderErrorPage() {
  return (
    <PageWrapper>
      <Container className={`flex-column ${classes.container}`}>
        <OrderErrorHeading />
        <OrderErrorButtons />
      </Container>
    </PageWrapper>
  );
}
