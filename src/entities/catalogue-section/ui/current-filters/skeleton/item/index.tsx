import classes from "./item-skeleton.module.scss";
import CurrentFiltersItemWrapper from "../../item-wrapper";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

export default function ItemWrapperSkeleton() {
  return (
    <CurrentFiltersItemWrapper type="neutral" className={classes.container}>
      <SkeletonWrapper className={classes.item} />
    </CurrentFiltersItemWrapper>
  );
}
