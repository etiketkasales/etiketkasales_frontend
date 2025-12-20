"use client";
import { useNotification } from "~/src/widgets/notifications/lib/hooks";

import classes from "./notification.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { INotification } from "~/src/widgets/notifications/model";
import { notificationIcons } from "~/src/widgets/notifications/model";
import { CSSProperties } from "react";

interface Props extends INotification {
  index: number;
}

export default function Notification({ uuid, message, type, index }: Props) {
  const { offsetX, handlers, isActive } = useNotification({ uuid });
  const Icon = notificationIcons[type];

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: "100%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={
            {
              x: offsetX || 0,
              "--index": index,
              y: -30 * index,
            } as CSSProperties
          }
          className={`flex-row align-center ${classes.container}`}
          {...handlers}
        >
          <Icon className={classes.icon} />
          <span className="text-neutral-900 heading h7 no-select">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
