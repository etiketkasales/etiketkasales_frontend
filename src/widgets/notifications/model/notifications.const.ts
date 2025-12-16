import Success from "~/public/notifications/success.svg";
import Error from "~/public/notifications/error.svg";
import Warning from "~/public/notifications/warning.svg";

type NotificationType = "success" | "warning" | "error";
export const notificationIcons: Record<
  NotificationType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  success: Success,
  warning: Warning,
  error: Error,
};
