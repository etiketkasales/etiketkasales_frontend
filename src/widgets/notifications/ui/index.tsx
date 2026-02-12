"use client";
import classNames from "classnames";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNotifications } from "~/src/app/store/reducers/notifications.slice";

import classes from "./notifications.module.scss";
import Notification from "./item";

export default function NotificationsWidget() {
  const { notifications } = useAppSelector(selectNotifications);

  if (!Array.isArray(notifications) || !notifications.length) return null;

  return (
    <div
      className={classNames(`flex-column--reverse ${classes.container}`, {
        [classes.noDisplay]: !notifications.length,
      })}
    >
      {notifications.map((item, index) => (
        <Notification key={`${index}-${item.uuid}`} index={index} {...item} />
      ))}
    </div>
  );
}
