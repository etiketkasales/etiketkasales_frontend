"use client";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./footer.module.scss";
import FooterTop from "./top";
import FooterBottom from "./bottom";
import Container from "~/src/shared/ui/container/ui";

export default function Footer() {
  const { tabsHeight } = useAppSelector(selectNavigation);
  return (
    <footer>
      <Container
        as="section"
        bgColor="neutral-900"
        className={`wrapper padding-32-24 flex-column gap-50 ${classes.container}`}
        style={{
          paddingBottom: tabsHeight ? `${tabsHeight + 24}px` : undefined,
        }}
      >
        <FooterTop />
        <div className={classes.drag}></div>
        <FooterBottom />
      </Container>
    </footer>
  );
}
