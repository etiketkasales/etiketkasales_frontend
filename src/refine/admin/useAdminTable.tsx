"use client";

import { useCallback, useMemo } from "react";
import { Form, type FormProps, type TableProps } from "antd";
import {
  mapAntdFilterToCrudFilter,
  mapAntdSorterToCrudSorting,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord, CrudFilters, LogicalFilter } from "@refinedev/core";

function mergePreservedFilters(
  prevFilters: CrudFilters,
  fromTable: CrudFilters,
): CrudFilters {
  const tableFields = new Set(
    fromTable
      .map((f) => ("field" in f ? (f as LogicalFilter).field : null))
      .filter((x): x is string => Boolean(x)),
  );
  const kept = prevFilters.filter((f) => {
    if (!("field" in f)) return false;
    return !tableFields.has((f as LogicalFilter).field as string);
  });
  return [...kept, ...fromTable];
}

export function useAdminTable(props: Parameters<typeof useTable>[0]) {
  const result = useTable(props);
  const {
    tableProps,
    filters,
    setFilters,
    setSorters,
    setCurrentPage,
    setPageSize,
    searchFormProps,
  } = result;

  const onChange: NonNullable<TableProps<BaseRecord>["onChange"]> = useCallback(
    (pagination, tableFilters, sorter) => {
      const crudFromTable = mapAntdFilterToCrudFilter(
        tableFilters ?? {},
        filters,
        undefined,
      );
      setFilters(mergePreservedFilters(filters, crudFromTable));

      if (sorter && !Array.isArray(sorter) && sorter.order) {
        setSorters(mapAntdSorterToCrudSorting(sorter));
      } else if (Array.isArray(sorter) && sorter.length) {
        setSorters(mapAntdSorterToCrudSorting(sorter));
      }

      setCurrentPage?.(pagination.current ?? 1);
      setPageSize?.(pagination.pageSize ?? 10);
    },
    [filters, setFilters, setSorters, setCurrentPage, setPageSize],
  );

  const mergedTableProps = useMemo(
    () => ({
      ...tableProps,
      onChange,
    }),
    [tableProps, onChange],
  );

  const hiddenSearchForm = useMemo(() => {
    const fp = searchFormProps as FormProps & { children?: unknown };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _omit, ...rest } = fp;
    return (
      <Form {...rest} style={{ ...(rest.style as object), display: "none" }} />
    );
  }, [searchFormProps]);

  return {
    ...result,
    tableProps: mergedTableProps,
    hiddenSearchForm,
  };
}
