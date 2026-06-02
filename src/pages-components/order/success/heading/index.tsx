import classes from "./heading.module.scss";

interface Props {
  isInvoicePayment?: boolean;
  orderId?: number | null;
}

export default function OrderSuccessHeading({
  isInvoicePayment = false,
  orderId,
}: Props) {
  if (isInvoicePayment) {
    return (
      <div className={`flex-column ${classes.container}`}>
        <h1 className="heading h4 text-neutral-1000">Заказ оформлен! 🎉</h1>
        <p className="text-body l text-neutral-700">
          Счёт на оплату доступен в разделе «Мои заказы»
          {orderId ? ` (заказ №${orderId})` : ""}. После поступления оплаты мы
          передадим заказ в СДЭК.
        </p>
      </div>
    );
  }

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
