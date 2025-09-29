"use client";
import React from "react";

import Button from "~/src/shared/ui/button";

export default function HeaderBottomNavButton() {
  return (
    <Button as="a" href="/for-bussiness" typeButton="blue" size="4-12">
      <span className="white text-16 semibold second-family max-content">
        Для бизнеса
      </span>
    </Button>
  );
}
