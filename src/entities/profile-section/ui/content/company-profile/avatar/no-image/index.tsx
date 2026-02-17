import classes from "../company-avatar.module.scss";
import ShopWindow from "~/public/profile/shop-window.svg";
import Container from "~/src/shared/ui/container/ui";

export default function CompanyProfileAvatarNoImage() {
  return (
    <Container
      bgColor={"yellow-200"}
      className={`place-center ${classes.image}`}
    >
      <ShopWindow />
    </Container>
  );
}
