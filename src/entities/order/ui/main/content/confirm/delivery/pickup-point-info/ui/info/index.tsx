import classes from "./info.module.scss";

interface Props {
  name: string;
  address: string;
}

export default function PickupPointInfoText({ name, address }: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <h6 className="heading h7 text-neutral-1000">{name}</h6>
      <p className="text-body l text-neutral-700">{address}</p>
    </div>
  );
}
