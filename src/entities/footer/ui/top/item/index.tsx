import classes from "./item.module.scss";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { FooterLinkListI } from "~/src/entities/footer/model/footer.interface";

interface Props extends FooterLinkListI {}

export default function FooterTopItem({ title, links }: Props) {
  return (
    <section className={`flex-column gap-5 flex-start ${classes.container}`}>
      <h6 className="heading h7 text-neutral-100 uppercase">{title}</h6>
      <ul className="flex-column gap-3 flex-start">
        {links.map((item, index) => {
          return (
            <li key={`${item.link}-${index}`}>
              <LinkContainer link={item.link} className={classes.button}>
                <span className="body-text l">{item.title}</span>
              </LinkContainer>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
