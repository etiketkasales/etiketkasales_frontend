"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";
import { selectFavourites } from "~/src/app/store/reducers/favourites.slice";

import classes from "./features.module.scss";
import HeartFill from "~/public/shared/heart-fill.svg";
import Cart2 from "~/public/shared/cart2-fill.svg";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { HeaderBottomFeatureI } from "~/src/entities/header/model/header.interface";
import ContainerShared from "~/src/shared/ui/container/ui";
import Wrapper from "~/src/shared/ui/wrapper";

export default function HeaderBottomFeatures() {
  const { cartItems } = useAppSelector(selectCart);
  const { favouriteItems } = useAppSelector(selectFavourites);
  const headerBottomFeatures: HeaderBottomFeatureI[] = [
    {
      Icon: HeartFill,
      value: favouriteItems.length,
      link: "/favourites",
    },
    {
      Icon: Cart2,
      value: cartItems.length,
      link: "/cart",
    },
  ];
  return (
    <>
      {headerBottomFeatures.map((item, index) => {
        return (
          <LinkContainer
            key={index}
            link={item.link}
            className={classes.container}
          >
            <div className="flex-row gap-6px align-center">
              <item.Icon />
              <Wrapper
                color={"neutral-300"}
                radius={8}
                padding="2px 4px"
                className={`place-center ${classes.container}`}
              >
                <span
                  className={`heading h7 text-neutral-700 nowrap-text text-center`}
                >
                  {item.value}
                </span>
              </Wrapper>
            </div>
          </LinkContainer>
        );
      })}
    </>
  );
}
