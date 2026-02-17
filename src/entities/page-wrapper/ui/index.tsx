import classes from "./page-wrapper.module.scss";
import Tabs from "~/src/widgets/tabs/ui";
import Footer from "~/src/entities/footer/ui";
import HeaderDefault from "~/src/entities/header-default/ui";

export default function PageWrapper({
  children,
  CustomHeader,
  TabsButton,
  popTabsList,
}: {
  children: React.ReactNode;
  CustomHeader?: React.ReactNode;
  TabsButton?: React.ReactNode;
  popTabsList?: boolean;
}) {
  return (
    <>
      {CustomHeader ? CustomHeader : <HeaderDefault />}
      <main
        className={`wrapper flex-column ${classes.container}`}
        style={{ marginBottom: "auto" }}
      >
        {children}
      </main>
      <Footer />
      <Tabs TabsButton={TabsButton} popList={popTabsList} />
    </>
  );
}
