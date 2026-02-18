import classes from "./order-status.module.scss";

interface Props {
  status: string;
  comment: string;
}

export default function OrderStatus({ status, comment }: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <p className="heading h5 text-neutral-800">{status || "В обработке"}</p>
      <p className="text-body xl text-neutral-800">
        {comment || "Доставку назначим после оплаты"}
      </p>
    </div>
  );
}
