interface Props {
  price: string;
  days: string;
}

export default function PickupPointPriceDays({ price, days }: Props) {
  return (
    <p className={`heading h7 text-neutral-1000 nowrap-text`}>
      {price}, {days}
    </p>
  );
}
