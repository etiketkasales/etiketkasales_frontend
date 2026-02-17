"use client";

import classNames from "classnames";
import { useItemWrapper } from "../lib/hooks/useItemWrapper.hook";

import classes from "./item-wrapper.module.scss";
import ItemWrapperTop from "./top";
import ItemWrapperCaption from "./caption";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  item: IEtiketka;
  className?: string;
}

export default function ItemWrapper({ item, className }: Props) {
  const { itemInfo, updateInfo } = useItemWrapper({ initInfo: item });
  const link = `/etiketka/${item.slug}/${item.id}`;

  return (
    <li
      className={classNames(
        `${classes.container} flex-column cursor flex-start`,
        className,
      )}
    >
      <ItemWrapperTop
        item={itemInfo}
        image={itemInfo.images[0]}
        updateInfo={updateInfo}
      />
      <ItemWrapperCaption
        title={itemInfo.name}
        price={itemInfo.price}
        discountPrice={itemInfo.old_price}
      />
      <LinkContainer link={link} className={classes.link} />
    </li>
  );
}
