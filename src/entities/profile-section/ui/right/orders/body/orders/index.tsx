"use client";
import React from "react";

import classes from "./orders.module.scss";
import ProfileOrdersItem from "./order";
import { ProfileOrderI } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  orders: ProfileOrderI[];
}

export default function ProfileOrdersList({ orders }: Props) {
  return (
    <ul className="flex-column gap-3">
      {orders.map((item, index) => {
        return <ProfileOrdersItem key={index} {...item} />;
      })}
    </ul>
  );
}
