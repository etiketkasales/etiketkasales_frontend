"use client";

import { Form, Input, InputNumber, Select, Switch } from "antd";
import type { CategoryAttributeField } from "~/src/features/admin/lib/categoryAttributeSchema";

type Props = {
  fields: CategoryAttributeField[];
  disabled?: boolean;
};

/** Динамические поля карточки по `categories.attribute_schema`. */
export function CategoryAttributeFields({ fields, disabled }: Props) {
  if (!fields.length) {
    return null;
  }

  return (
    <>
      {fields.map((f) => {
        const rules = f.required
          ? [{ required: true, message: `Заполните «${f.label}»` }]
          : undefined;
        const name: (string | number)[] = ["categoryAttrs", f.key];

        if (f.type === "number") {
          return (
            <Form.Item key={f.key} name={name} label={f.label} rules={rules}>
              <InputNumber disabled={disabled} style={{ width: 200 }} />
            </Form.Item>
          );
        }
        if (f.type === "boolean") {
          return (
            <Form.Item
              key={f.key}
              name={name}
              label={f.label}
              valuePropName="checked"
              rules={rules}
            >
              <Switch disabled={disabled} />
            </Form.Item>
          );
        }
        if (f.type === "select" && (f.options?.length ?? 0) > 0) {
          return (
            <Form.Item key={f.key} name={name} label={f.label} rules={rules}>
              <Select
                allowClear={!f.required}
                disabled={disabled}
                options={f.options!.map((o) => ({ value: o, label: o }))}
                style={{ minWidth: 220 }}
                placeholder="Выберите"
              />
            </Form.Item>
          );
        }
        return (
          <Form.Item key={f.key} name={name} label={f.label} rules={rules}>
            <Input disabled={disabled} placeholder={f.label} />
          </Form.Item>
        );
      })}
    </>
  );
}
