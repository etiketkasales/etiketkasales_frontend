"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useAdvs } from "~/src/shared/ui/advs/lib/hooks/useAdvs.hook";

import classes from "./three-ads.module.scss";
import ImageContainer from "~/src/shared/ui/image-container";

export default function ThreeAds() {
  const { loaded } = useAppSelector(selectNavigation);
  const { advs, loading } = useAdvs();
  if (!advs) return null;
  return (
    <div className="template-columns-12 gap-5">
      {advs.slice(0, 3).map((item, index) => {
        return (
          <div className={`${classes.item}`} key={index}>
            <ImageContainer
              src={item.image_url}
              width={399}
              height={160}
              alt={"Рекламный баннер"}
              loading={"lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}
