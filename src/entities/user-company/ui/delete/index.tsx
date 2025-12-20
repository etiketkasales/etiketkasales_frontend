import classes from "./delete.module.scss";
import XCircle from "~/public/profile/x-circle.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
  loading?: boolean;
}

export default function DeleteCompany({ onClick, loading = false }: Props) {
  return (
    <Button
      typeButton="ghost"
      onClick={onClick}
      className={classes.container}
      needActiveScale={false}
      disabled={loading}
    >
      <XCircle />
    </Button>
  );
}
