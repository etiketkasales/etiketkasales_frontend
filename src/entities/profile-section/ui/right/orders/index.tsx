"use client";
import React from "react";

import classes from "./purchases.module.scss";
import ProfileOrdersBody from "./body";
import { profileOrdersTestC } from "~/src/entities/profile-section/model/profile.const";

export default function ProfileOrders() {
  return (
    <div className={`flex-column gap-6 relative ${classes.container}`}>
      <h1 className="text-28 black bold second-family">Мои заказы</h1>
      <ProfileOrdersBody currentOrders={profileOrdersTestC} />
    </div>
  );
}
