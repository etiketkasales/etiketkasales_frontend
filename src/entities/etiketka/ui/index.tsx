import React from "react";
import classNames from "classnames";

import classes from "./etiketka.module.scss";
import EtiketkaMain from "./main";
import EtiketkaInfo from "./info";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import { IEtiketka } from "../model";

interface Props {
  loading: boolean;
  productInfo: IEtiketka;
  updateInfo: () => Promise<void>;
}

export default function EtiketkaSection({
  loading,
  productInfo,
  updateInfo,
}: Props) {
  const commonProps = {
    updateInfo,
  };

  return (
    <section className={classNames(`flex-column gap-5`, classes.container)}>
      {loading && <LoaderCircle radius={0} />}
      <EtiketkaMain {...commonProps} item={productInfo} />
      <EtiketkaInfo item={productInfo} />
    </section>
  );
}
