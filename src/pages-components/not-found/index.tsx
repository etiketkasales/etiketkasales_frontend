import classes from "./not-found.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import HeaderWithText from "~/src/entities/header-with-text/ui";
import Container from "~/src/shared/ui/container/ui";
import Button from "~/src/shared/ui/button";

export default function NotFoundPage() {
  return (
    <PageWrapper
      CustomHeader={
        <HeaderWithText
          text="Ошибка"
          classNameBackButton={classes.backButton}
        />
      }
    >
      <Container
        bgColor={null}
        className={`flex-column align-center ${classes.container}`}
      >
        <div className="flex-column gap-3 align-center">
          <h2 className="heading h2 text-yellow-1000 text-center">404</h2>
          <p className="text-body xl text-yellow-1000 text-center">
            Страница не найдена
          </p>
        </div>
        <Button typeButton="white" className={classes.button} as={"a"} href="/">
          <span className="heading h7">На главную</span>
        </Button>
      </Container>
    </PageWrapper>
  );
}
