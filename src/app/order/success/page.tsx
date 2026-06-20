import { Suspense } from "react";
import OrderSuccessPage from "~/src/pages-components/order/success";
import Loader from "~/src/shared/ui/loader";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          style={{ minHeight: "40vh", display: "grid", placeItems: "center" }}
        >
          <Loader radius={24} />
        </div>
      }
    >
      <OrderSuccessPage />
    </Suspense>
  );
}
