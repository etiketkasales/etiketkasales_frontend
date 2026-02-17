"use client";

import Link from "next/link";

interface Props {
  link: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
}

export default function LinkContainer({
  children,
  className,
  link,
  target,
}: Props) {
  const isExternal =
    link.startsWith("http://") ||
    link.startsWith("https://") ||
    link.startsWith("mailto:") ||
    link.startsWith("tel:");

  if (isExternal || target === "_blank") {
    return (
      <a
        href={link}
        className={className}
        rel="noopener noreferrer"
        target={target}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={link} className={className} prefetch>
      {children}
    </Link>
  );
}
