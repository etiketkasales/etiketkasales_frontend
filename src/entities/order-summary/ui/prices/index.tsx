import classNames from "classnames";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./prices.module.scss";
import OrderSummaryPricesItem from "./item";

interface Props {
  totalSum: number;
  discountSum: number;
  paySum: number;
  totalItemsAmount: number;
}

interface IItem {
  title: string;
  value: string;
}

export default function OrderSummaryPrices({
  totalSum,
  discountSum,
  paySum,
  totalItemsAmount,
}: Props) {
  const sumList: IItem[] = [
    {
      title: StringUtils.pluralizeWords(
        ["товар", "товара", "товаров"],
        totalItemsAmount,
      ),
      value: `${StringUtils.formatPrice(totalSum)} ₽`,
    },
    {
      title: "Скидка",
      value: `- ${StringUtils.formatPrice(discountSum)} ₽`,
    },
  ];

  return (
    <div className={`flex-column ${classes.container}`}>
      <div className={`flex-column ${classes.innerContainer}`}>
        {sumList.map((item, index) => (
          <OrderSummaryPricesItem
            {...item}
            key={`${index}-${item.title}`}
            titleClassName="text-body xl text-neutral-700"
            valueClassName={classNames(`heading h6 nowrap-text`, {
              ["text-green-700"]: index === sumList.length - 1,
              ["text-neutral-1000"]: index !== sumList.length - 1,
            })}
            containerClassName="align-center"
          />
        ))}
      </div>
      <OrderSummaryPricesItem
        title="Итого"
        titleClassName="heading h6 text-neutral-1000"
        value={`${StringUtils.formatPrice(paySum)} ₽`}
        valueClassName="heading h4 text-neutral-1000 nowrap-text"
        containerClassName="flex-end"
      />
    </div>
  );
}
