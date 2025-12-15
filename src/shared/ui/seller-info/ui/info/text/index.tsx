import StarIcon from "~/public/seller-info/star-fill.svg";

interface Props {
  name: string;
  rating: number;
  reviews: number;
}

export default function SellerInfoText({ name, rating, reviews }: Props) {
  return (
    <div className="flex-column space-between">
      <p className="text-body m text-neutral-1000">{name}</p>
      <div className="flex-row align-center gap-6px">
        <StarIcon />
        <p className="text-body s text-neutral-700">
          {rating || 0} {`(${reviews || 0})`}
        </p>
      </div>
    </div>
  );
}
