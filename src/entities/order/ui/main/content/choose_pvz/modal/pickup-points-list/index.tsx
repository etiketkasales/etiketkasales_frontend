"use client";

import classes from "./pickup-points-list.module.scss";
import { IOrderPickupPointResponse } from "~/src/entities/order/model";

interface Props {
  points: IOrderPickupPointResponse[];
  selectedCode?: string | null;
  onSelect: (point: IOrderPickupPointResponse) => void;
}

export default function PickupPointsList({
  points,
  selectedCode,
  onSelect,
}: Props) {
  return (
    <div className={`flex-column ${classes.list}`}>
      <p className="text-body m text-neutral-800">
        Выберите пункт выдачи из списка:
      </p>
      {points.map((point) => (
        <button
          key={point.code}
          type="button"
          className={`${classes.item}${selectedCode === point.code ? ` ${classes.active}` : ""}`}
          onClick={() => onSelect(point)}
        >
          <span className="text-body l text-neutral-1000">{point.name}</span>
          <span className="text-body s text-neutral-700">
            {point.full_address}
          </span>
          <span className="text-body s text-neutral-800">
            {point.cost_formatted}
            {point.delivery_time?.formatted
              ? ` · ${point.delivery_time.formatted}`
              : ""}
          </span>
        </button>
      ))}
    </div>
  );
}
