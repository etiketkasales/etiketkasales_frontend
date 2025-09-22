"use client";
import React from "react";

import classes from "./authorize.module.scss";
import Person from "~/public/shared/person-circle-fill.svg";
import Link from "next/link";

export default function HeaderBottomAuthorize() {
  return (
    <Link href="/login" rel="noopener noreferrer" className={classes.container}>
      <section className="flex-row gap-6px align-center">
        <Person />
        <span className="body-text l text-neutral-700">Войти</span>
      </section>
    </Link>
  );
}
