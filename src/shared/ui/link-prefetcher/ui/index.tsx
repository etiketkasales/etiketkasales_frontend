"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  link: string;
}

export default function LinkPrefetcher({ link }: Props) {
  const { prefetch } = useRouter();

  useEffect(() => {
    prefetch(link);
  }, [prefetch, link]);

  return null;
}
