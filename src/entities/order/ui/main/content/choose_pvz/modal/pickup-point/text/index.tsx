import classes from "./pickup-point-text.module.scss";

interface Props {
  title: string;
  address: string;
  cost: string;
  date: string;
}

export default function PickupPointText({ title, address, cost, date }: Props) {
  const priceAndDateArray = [cost, date];

  return (
    <>
      <div className={`flex-column ${classes.heading}`}>
        <h6 className="heading h7 text-neutral-1000">{title}</h6>
        <p className="text-body l text-neutral-700">{address}</p>
      </div>
      <h6 className="heading h7 text-neutral-1000">
        {priceAndDateArray.filter(Boolean).join(", ")}
      </h6>
    </>
  );
}
