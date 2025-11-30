"use client";
import React, { useCallback, useEffect, useRef } from "react";

import classes from "./load-more.module.scss";
import Button from "~/src/shared/ui/button";
import { useLoadMore } from "../../../lib/hooks/useLoadMore.hook";

interface Props {
  paginationPage: number;
  setPaginationPage: (page: number) => void;
}

export default function LoadMoreButton({
  paginationPage,
  setPaginationPage,
}: Props) {
  const { ref, onClick } = useLoadMore({
    setPage: setPaginationPage,
    page: paginationPage,
  });

  return (
    <Button
      typeButton="gray"
      className={classes.container}
      ref={ref}
      onClick={onClick}
      radius={12}
    >
      <span className="text-body xl">Загрузить еще</span>
    </Button>
  );
}
