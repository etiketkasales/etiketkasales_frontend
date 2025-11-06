import { Metadata } from "next";
import LoginPage from "~/src/pages-components/login";

export const metadata: Metadata = {
  description: "Авторизация на маркетплейсе EtiketkaSales",
};

export default function Page() {
  return <LoginPage />;
}
