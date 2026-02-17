import HeaderForBussiness from "../../for-bussiness";
import HeaderFeaturesIcons from "./icons";
import HeaderProfile from "./profile";

export default function HeaderFeatures() {
  return (
    <div className={`flex-row align-center gap-9`}>
      <HeaderForBussiness />
      <HeaderFeaturesIcons />
      <HeaderProfile />
    </div>
  );
}
