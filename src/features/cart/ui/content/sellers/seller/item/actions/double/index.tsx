import React from "react";
import classNames from "classnames";

import classes from "./double.module.scss";
import Heart from "~/public/cart/heart-fill.svg";
import HeartMeda from "~/public/cart/heart-fill-media.svg";
import Trash from "~/public/cart/trash2-fill.svg";
import TrashMedia from "~/public/cart/trash2-fill-media.svg";

interface Props {
  deleteFromCart: () => Promise<void>;
  containerClassName?: string;
}

interface IItem {
  title: string;
  onClick: () => Promise<void> | void;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  IconMedia: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function SellerItemDouble({
  deleteFromCart,
  containerClassName,
}: Props) {
  const items: IItem[] = [
    {
      title: "В избранное",
      onClick: () => {},
      Icon: Heart,
      IconMedia: HeartMeda,
    },
    {
      title: "Удалить",
      onClick: deleteFromCart,
      Icon: Trash,
      IconMedia: TrashMedia,
    },
  ];

  return (
    <div
      className={classNames(
        `flex-row ${classes.container}`,
        containerClassName,
      )}
    >
      {items.map((item, index) => {
        const { title, onClick, Icon, IconMedia } = item;
        return (
          <div
            key={`${index}-${title}`}
            className={`${classes.item} pointer`}
            onClick={onClick}
            role="button"
          >
            <Icon className={classes.icon} />
            <IconMedia className={classes.iconMedia} />
            <p className="text-body m text-neutral-1000">{title}</p>
          </div>
        );
      })}
    </div>
  );
}
