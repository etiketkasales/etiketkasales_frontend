import containerClasses from "../quote.module.scss";
import classes from "./rejected.module.scss";
import Container from "~/src/shared/ui/container/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  reason: string | null;
}

export default function QuoteRejected({ reason }: Props) {
  return (
    <Container
      bgColor={"red-700"}
      className={`flex-column ${classes.container} ${containerClasses.container}`}
    >
      <div className="flex-column gap-3">
        <h3 className="text-neutral-100 heading h4">
          Магазин не прошел модерацию!
        </h3>
        {reason && <p className="text-body xl text-neutral-100">{reason}</p>}
      </div>
      <Button
        typeButton="white"
        as={"a"}
        href="/"
        radius={12}
        className={classes.button}
      >
        <span className="heading h7 text-neutral-800">
          Вернуться на главную
        </span>
      </Button>
    </Container>
  );
}
