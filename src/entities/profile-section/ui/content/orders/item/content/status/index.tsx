import classes from "./order-status.module.scss";

interface Props {
  status: string;
  comment: string;
  track_number?: string | null;
  tracking_url?: string | null;
}

export default function OrderStatus({
  status,
  comment,
  track_number,
  tracking_url,
}: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <p className="heading h5 text-neutral-800">{status || "В обработке"}</p>
      {comment ? (
        <p className="text-body xl text-neutral-800">{comment}</p>
      ) : null}
      {track_number ? (
        <p className="text-body l text-neutral-800">
          Трек-номер:{" "}
          {tracking_url ? (
            <a
              href={tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600"
            >
              {track_number}
            </a>
          ) : (
            <span>{track_number}</span>
          )}
        </p>
      ) : null}
    </div>
  );
}
