"use client";

import { useWindowSize } from "react-use";

import ViewAllButton from "~/src/entities/view-all-button/ui";

interface Props {
  title: string;
  categoryId: number;
}

export default function SectionWrapperHeading({ title, categoryId }: Props) {
  const { width } = useWindowSize();
  return (
    <section
      className={`flex-row align-center ${width <= 768 ? "space-between" : ""} gap-6`}
    >
      <h2 className="text-20 bold second-family uppercase">{title}</h2>
      <ViewAllButton categoryId={categoryId} />
    </section>
  );
}
