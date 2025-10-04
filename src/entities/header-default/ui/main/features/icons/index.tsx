import React from "react";
import FeaturesSwitcher from "./switcher";

const items: { type: "cart" | "favourites" }[] = [
  {
    type: "cart",
  },
  {
    type: "favourites",
  },
];

export default function HeaderFeaturesIcons() {
  return (
    <>
      {items.map((item, index) => (
        <FeaturesSwitcher key={index + item.type} type={item.type} />
      ))}
    </>
  );
}
