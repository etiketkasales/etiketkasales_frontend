"use client";
import classNames from "classnames";
import { useSearchProducts } from "~/src/entities/header-default/lib/hooks";

import classes from "./header-search.module.scss";
import RightIcon from "~/public/shared/search.svg";
import TextInput from "~/src/shared/ui/inputs/text-input";
import Loader from "~/src/shared/ui/loader";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  classNameInput?: string;
  className?: string;
}

export default function HeaderSearch({ classNameInput, className }: Props) {
  const { products, loading, onInputChange } = useSearchProducts();

  return (
    <TextInput
      placeholder="Поиск по сайту"
      classNameLabel={classNames(
        classes.input,
        classNameInput,
        "text-neutral-900 text-body l",
      )}
      wrapperClassName={classNames(className, "relative")}
      name="search-etiketka"
      id="search-etiketka"
      RightIcon={RightIcon}
      iconButtonClassName={classes.icon}
      onChange={(e) => onInputChange(e.target.value)}
      autoComplete="off"
    >
      {products?.length > 0 && (
        <div
          className={`${classes.products} flex-column scrollbar options-container`}
        >
          {loading && <Loader radius={16} />}
          {products.map((item, index) => (
            <LinkContainer
              key={`${item.slug}-${index}`}
              link={`/etiketka/${item.slug}/${item.id}`}
              className={`nowrap-text text-body xl ${classes.item}`}
            >
              {item.name}
            </LinkContainer>
          ))}
        </div>
      )}
    </TextInput>
  );
}
