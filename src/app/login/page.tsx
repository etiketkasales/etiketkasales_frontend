import { Metadata } from "next";
import LoginMain from "~/src/features/login/ui";

export const metadata: Metadata = {
  description: "Авторизация на маркетплейсе EtiketkaSales",
};

export default function Page() {
  return <LoginMain />;
}
