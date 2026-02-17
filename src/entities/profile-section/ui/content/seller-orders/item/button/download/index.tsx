import classes from "./download.module.scss";
import Button from "~/src/shared/ui/button";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  act_url: string | null;
  invoice_url: string | null;
}

export default function SellerOrderDownloadButton({
  act_url,
  invoice_url,
}: Props) {
  const buttons = [
    {
      link: act_url,
      text: "акт",
    },
    {
      link: invoice_url,
      text: "чек",
    },
  ];

  return (
    <div className={`flex gap-4 ${classes.container}`}>
      {buttons.map((item, index) => {
        if (!item.link) return null;
        return (
          <LinkContainer
            key={`${index}-${item.link}`}
            link={item.link}
            className={classes.button}
            target="_blank"
          >
            <span className="heading h7 text-neutral-800">
              Скачать {item.text}
            </span>
          </LinkContainer>
        );
      })}
    </div>
  );
}
