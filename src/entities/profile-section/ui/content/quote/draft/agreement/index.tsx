"use client";
import React from "react";
import classNames from "classnames";
import { useGetAgreement } from "~/src/entities/profile-section/lib/hooks";

import classes from "./agreement.module.scss";
import ReactMarkDown from "react-markdown";
import Container from "~/src/shared/ui/container/ui";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import QuoteStageContainer from "../stage-container";

export default function QuoteAgreement() {
  const { loadingTerms, terms } = useGetAgreement();

  return (
    <QuoteStageContainer
      title={"Согласие с условиями"}
      className={`flex-column gap-4`}
    >
      <Container
        bgColor={"neutral-300"}
        className={classNames(`${classes.terms} relative`, classes.terms, {
          [classes.loader]: loadingTerms,
        })}
      >
        {loadingTerms ? (
          <LoaderCircle radius={20} />
        ) : (
          <ReactMarkDown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body l text-neutral-700"
                  {...props}
                >
                  {props.children}
                </a>
              ),
              p: ({ node, ...props }) => (
                <p className="text-body l text-neutral-700">{props.children}</p>
              ),
              h2: ({ node, ...props }) => (
                <h2 className="heading h4 text-neutral-1000">
                  {props.children}
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 className="heading h4 text-neutral-1000">
                  {props.children}
                </h3>
              ),
              h4: ({ node, ...props }) => (
                <h4 className="heading h4 text-neutral-1000">
                  {props.children}
                </h4>
              ),
              h5: ({ node, ...props }) => (
                <h5 className="heading h4 text-neutral-1000">
                  {props.children}
                </h5>
              ),
              h6: ({ node, ...props }) => (
                <h6 className="heading h4 text-neutral-1000">
                  {props.children}
                </h6>
              ),
              ul: ({ node, ...props }) => (
                <ul className="flex-column gap-10px" {...props} />
              ),
            }}
          >
            {terms || "Не удалось получить соглашение"}
          </ReactMarkDown>
        )}
      </Container>
    </QuoteStageContainer>
  );
}
