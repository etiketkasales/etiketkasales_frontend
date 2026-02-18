import classes from "./heading.module.scss";

export default function OrderSuccessHeading() {
  return (
    <div className={`flex-column ${classes.container}`}>
      <h1 className="heading h4 text-neutral-1000">Заказ оформлен! 🎉</h1>
      <p className="text-body l text-neutral-700">
        Благодарим за ваш заказ. Подтверждение отправлено на почту, указанную
        при оформлении. Вы можете отслеживать статус в личном кабинете или через
        ссылку в письме.
      </p>
    </div>
  );
}
