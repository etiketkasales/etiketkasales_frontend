import classes from "./legal-page.module.scss";
import ReactMarkDown from "react-markdown";
import HeaderWithText from "../../header-with-text/ui";
import PageWrapper from "../../page-wrapper/ui";
import Container from "~/src/shared/ui/container/ui";
import { ILegalPage } from "../model";

interface Props extends ILegalPage {}

const headerClassName = "heading h7 text-neutral-700";

export default function LegalPage({ title, content }: Props) {
  return (
    <PageWrapper CustomHeader={<HeaderWithText text={title} />}>
      <Container className={`flex-column ${classes.container}`}>
        <div className={`flex-column gap-3 ${classes.content}`}>
          <ReactMarkDown
            components={{
              p: ({ node, ...props }) => (
                <p className="text-body xl text-neutral-700">
                  {props.children}
                </p>
              ),
              h1: ({ node, ...props }) => (
                <h1 className="heading h4 text-neutral-1000">
                  {props.children}
                </h1>
              ),
              h2: ({ node, ...props }) => (
                <h2 className={headerClassName}>{props.children}</h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 className={headerClassName}>{props.children}</h3>
              ),
              h4: ({ node, ...props }) => (
                <h4 className={headerClassName}>{props.children}</h4>
              ),
              h5: ({ node, ...props }) => (
                <h5 className={headerClassName}>{props.children}</h5>
              ),
              h6: ({ node, ...props }) => (
                <h6 className={headerClassName}>{props.children}</h6>
              ),
              li: ({ node, ...props }) => (
                <li
                  className={`${classes.listItem} text-body xl text-neutral-700`}
                >
                  {props.children}
                </li>
              ),
            }}
          >
            {content || "Не удалось получить содержимое"}
          </ReactMarkDown>
        </div>
      </Container>
    </PageWrapper>
  );
}
