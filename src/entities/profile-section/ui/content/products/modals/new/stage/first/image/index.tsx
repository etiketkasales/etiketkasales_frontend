import classes from "./image.module.scss";
import DeleteIcon from "~/public/shared/x-circle.svg";
import Button from "~/src/shared/ui/button";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

interface Props {
  deleteKey: string;
  src: string;
  onDeleteImage: (key: string) => void;
}

export default function ProductsModalImage({
  src,
  deleteKey,
  onDeleteImage,
}: Props) {
  return (
    <ImageWrapper
      src={src}
      width={160}
      height={160}
      className={`${classes.image} mandatory-x-item`}
    >
      <Button
        typeButton="ghost"
        className={classes.icon}
        onClick={() => onDeleteImage(deleteKey)}
      >
        <DeleteIcon />
      </Button>
    </ImageWrapper>
  );
}
