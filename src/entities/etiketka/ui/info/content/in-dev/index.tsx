import classes from "./in-dev.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

export default function EtiketkaInDev() {
  return (
    <div className={`${classes.container} flex-column align-center`}>
      <ImageWrapper
        src={`/header/logo.png`}
        width={262}
        height={50}
        className={classes.image}
      />
      <h4 className="heading h4 text-neutral-grey-900">Раздел в разработке</h4>
    </div>
  );
}
