import ClientInitializer from "./client-initializer";
import NotificationsWidget from "~/src/widgets/notifications/ui";
import YMapsProvider from "~/src/widgets/yandex-maps/ui/provider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ClientInitializer />
      <NotificationsWidget />
      <YMapsProvider />
    </>
  );
}
