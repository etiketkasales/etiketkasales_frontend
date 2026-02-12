import classes from "./approved.module.scss";
import Container from "~/src/shared/ui/container/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  deleteBubble: () => void;
}

export default function QuoteApproved({ deleteBubble }: Props) {
  return (
    <Container
      bgColor={"green-700"}
      className={`flex space-between gap-3 ${classes.container}`}
    >
      <h4 className="heading h6 text-neutral-100">
        Модерация пройдена! Можете начать тут все обустраивать.
      </h4>
      <Button
        typeButton="white"
        onClick={deleteBubble}
        radius={12}
        className={classes.button}
      >
        <span className="heading h7 text-neutral-1000">Закрыть</span>
      </Button>
    </Container>
  );
}
