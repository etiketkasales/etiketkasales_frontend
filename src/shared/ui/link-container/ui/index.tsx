import React from "react";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
  className?: string;
  link: string;
}

export default function LinkContainer({ children, className, link }: Props) {
  return (
    <Link href={link} className={className} rel="noopener noreferrer">
      {children}
    </Link>
  );
}
