"use client";
import React, { useMemo } from "react";

export default function FooterBottom() {
  const className: string = useMemo(() => `body-text m text-neutral-600`, []);

  return (
    <section className={`flex-column gap-5`}>
      <h6 className={className}>
        © 2025 ЭТИКЕТКАСЕЙЛС. Товарные знаки и бренды являются собственностью их
        соответствующих владельцев.
      </h6>
      <h6 className={className}>ООО&nbsp;"ФА-ПРОДЖЕКТ" ИНН&nbsp;5036178082</h6>
    </section>
  );
}
