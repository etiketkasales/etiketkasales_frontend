"use client";
import Link from "next/link";
import React from "react";

import Button from "~/src/shared/ui/button";

export default function HeaderBottomNavButton() {
  return (
    <Link href={"/for-bussiness"} passHref>
      <Button as="a" typeButton="blue" size="4-12">
        <span className="white text-16 semibold second-family max-content">
          Для бизнеса
        </span>
      </Button>
    </Link>
  );
}
