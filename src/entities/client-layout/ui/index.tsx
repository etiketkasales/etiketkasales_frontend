import ClientInitializer from "./client-initializer";
import NotificationsWidget from "~/src/widgets/notifications/ui";
import AccountStatusBanner from "~/src/widgets/account-status-banner/ui";
import YMapsProvider from "~/src/widgets/yandex-maps/ui/provider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountStatusBanner />
      {children}
      <ClientInitializer />
      <NotificationsWidget />
      <YMapsProvider />
    </>
  );
}
