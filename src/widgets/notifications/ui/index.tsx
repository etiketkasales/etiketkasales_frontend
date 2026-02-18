"use client";
import classNames from "classnames";
import { selectNotifications } from "~/src/app/store/reducers/notifications.slice";
import { useAppSelector } from "~/src/app/store/hooks";
import { useNotifications } from "../lib/hooks";

import classes from "./notifications.module.scss";
import Notification from "./item";

export default function NotificationsWidget() {
  const { notifications } = useAppSelector(selectNotifications);
  const { disableModalClose, enableModalClose } = useNotifications();

  if (!Array.isArray(notifications) || !notifications.length) return null;

  return (
    <div
      className={classNames(`flex-column--reverse ${classes.container}`, {
        [classes.noDisplay]: !notifications.length,
      })}
      onClick={() => disableModalClose({ needTimeout: true })}
      onTouchStart={() => disableModalClose({ needTimeout: false })}
      onTouchEnd={() => enableModalClose()}
    >
      {notifications.map((item, index) => (
        <Notification key={`${index}-${item.uuid}`} index={index} {...item} />
      ))}
    </div>
  );
}
