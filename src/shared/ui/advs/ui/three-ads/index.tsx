"use client";
import React from "react";
import { useAdvs } from "~/src/shared/ui/advs/lib/hooks/useAdvs.hook";

import classes from "./three-ads.module.scss";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import InfoPlain from "../info-plain";
import ImageWrapper from "../../../image-wrapper/ui";

export default function ThreeAds() {
  const { advs, loading } = useAdvs();

  return (
    <div className="template-columns-12 gap-5">
      {(loading ? Array(3).fill("") : advs).slice(0, 3).map((item, index) => {
        if (loading) {
          return <SkeletonWrapper key={index} className={classes.item} />;
        }

        return (
          <ImageWrapper
            key={index}
            src={item.image_url}
            width={399}
            height={160}
            alt={"Рекламный баннер"}
            loading={"lazy"}
            className={`${classes.item} relative`}
          >
            <InfoPlain className={classes.infoPlain} needText={false} />
          </ImageWrapper>
        );
      })}
    </div>
  );
}
