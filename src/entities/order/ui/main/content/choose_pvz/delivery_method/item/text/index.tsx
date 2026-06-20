interface Props {
  name: string;
  address: string | null;
  canChoose: boolean;
  isAvailable?: boolean;
}

export default function DeliveryMethodText({
  name,
  address,
  canChoose,
  isAvailable = true,
}: Props) {
  return (
    <div className="flex-column gap-6px">
      <p className="heading h7 text-neutral-1000">{name}</p>
      <p className="text-body l text-neutral-700">
        {!isAvailable
          ? "Подключим позже"
          : !canChoose
            ? "Чтобы выбрать ПВЗ добавьте адрес доставки"
            : address
              ? "Выберите ПВЗ"
              : address}
      </p>
    </div>
  );
}
