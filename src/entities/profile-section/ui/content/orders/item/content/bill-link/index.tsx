import classes from "./bill-link.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  url: string;
}

export default function OrderBillUrl({ url }: Props) {
  return (
    <Container
      bgColor={"yellow-500"}
      as="a"
      href={url}
      target="_blank"
      rel="noopener norefferer"
      className={classes.container}
    >
      <span className="heading h7 text-yellow-1000">Скачать счет</span>
    </Container>
  );
}
