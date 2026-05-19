"use client";

import type { ReactNode } from "react";
import { Space, Typography } from "antd";

type Props = {
  children: ReactNode;
};

/**
 * Обертка для ячеек с контролами в таблице админки:
 * гасит всплытие клика/мыши, чтобы не срабатывал onRow (Drawer/навигация).
 */
export function AdminActionSurface({ children }: Props) {
  return (
    <Space
      direction="vertical"
      size={6}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </Space>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function AdminActionSection({ title, children }: SectionProps) {
  return (
    <Space direction="vertical" size={4} style={{ width: "100%" }}>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {title}
      </Typography.Text>
      {children}
    </Space>
  );
}
