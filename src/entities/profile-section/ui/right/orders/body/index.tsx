"use client";
import React from "react";

import classes from "./body.module.scss";
import { ProfileOrderI } from "~/src/entities/profile-section/model/profile.interface";
import ProfileOrdersList from "./orders";

interface Props {
  currentOrders?: ProfileOrderI[];
}

export default function ProfileOrdersBody({ currentOrders }: Props) {
  if (!currentOrders || !currentOrders.length) {
    return (
      <div className={`place-center ${classes.no_data}`}>
        <p className="text-20 second-family gray-2 regular text-center">
          У вас нет текущих заказов
        </p>
      </div>
    );
  }

  return <ProfileOrdersList orders={currentOrders} />;
}
