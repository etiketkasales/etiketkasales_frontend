import FeaturesCartItem from "../cart";
import FeaturesFavouritesItem from "../favourites";

interface Props {
  type: "cart" | "favourites";
}

export default function FeaturesSwitcher({ type }: Props) {
  switch (type) {
    default:
    case "cart":
      return <FeaturesCartItem />;
    case "favourites":
      return <FeaturesFavouritesItem />;
  }
}
