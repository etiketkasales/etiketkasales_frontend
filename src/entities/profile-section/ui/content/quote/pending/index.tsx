import classes from "./pending.module.scss";
import containerClasses from "../quote.module.scss";
import Container from "~/src/shared/ui/container/ui";

export default function QuotePending() {
  return (
    <Container
      className={`flex-column gap-3 ${containerClasses.container} ${classes.container}`}
    >
      <h3 className="heading h4 text-neutral-1000">
        Заявка на регистрацию магазина принята!
      </h3>
      <p className="text-body xl text-neutral-700">
        Сейчас она на модерации, рассмотрим её в течении 1-3 дней.
      </p>
    </Container>
  );
}
