import classes from "./heading.module.scss";

export default function OrderErrorHeading() {
  return (
    <div className={`flex-column ${classes.container}`}>
      <h1 className="heading h4 text-neutral-1000">
        Что-то пошло не так {`:(`}
      </h1>
      <p className="text-body l text-neutral-700">
        К сожалению, не удалось завершить оформление. Попробуйте снова.
      </p>
    </div>
  );
}
