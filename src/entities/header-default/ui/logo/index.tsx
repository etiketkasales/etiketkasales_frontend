import Image from "next/image";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  width?: number;
  height?: number;
  imageSrc?: string;
}

export default function HeaderLogo({
  height = 46,
  width = 242,
  imageSrc = "/header/logo.png",
}: Props) {
  return (
    <LinkContainer link="/">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Image src={imageSrc} width={242} height={46} alt="" priority />
      </div>
    </LinkContainer>
  );
}
