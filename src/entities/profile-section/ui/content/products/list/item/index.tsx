import classes from "./product.module.scss";
import ProfileProductTop from "./top";
import ProfileProductBottom from "./bottom";
import { ISellerProduct } from "~/src/entities/profile-section/model";
import { pickProductImageUrl } from "~/src/shared/lib/utils/media-url.util";

interface Props extends ISellerProduct {
  openProductModal: (id: number) => void;
  setModalActive: () => void;
}

export default function ProfileProduct({
  id,
  image,
  images,
  openProductModal,
  setModalActive,
  ...rest
}: Props) {
  return (
    <li className={`flex-column ${classes.container}`}>
      <ProfileProductTop
        image={image || pickProductImageUrl(images)}
        onButtonClick={() => {
          openProductModal(id);
          setModalActive();
        }}
      />
      <ProfileProductBottom {...rest} id={id} />
    </li>
  );
}
