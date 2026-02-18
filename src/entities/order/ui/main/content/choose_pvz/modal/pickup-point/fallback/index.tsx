import classNames from "classnames";
import classes from "./fallback.module.scss";

export default function PickupPointFallback() {
  return (
    <div className={classNames("flex-column gap-4", classes.container)}>
      <h6 className="heading h7 text-neutral-1000">Выберите пункт выдачи</h6>
      <p className="text-body m text-netural-700">
        Чтобы посмотреть информацию о пункте нажмите, на метку на карте
      </p>
    </div>
  );
}
