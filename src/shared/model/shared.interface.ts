import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from "react";

export interface PositionXYInterface {
  x: number;
  y: number;
}

export interface SimpleIconButton {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

export interface GetDataInterface<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface MessageI {
  message: string;
  type: "error" | "success" | "warning";
  field?: string;
}

export interface ReponseInterface<T> {
  data: T;
  message: string;
  success: string;
}

export interface IJwtToken {
  sub: number;
  role: "buyer" | "seller" | "admin";
  phone: string;
  iat: number;
  exp: number;
}

export interface IJwtExpanded extends IJwtToken {
  isExpired: boolean;
}

export type PolymorphicProps<T extends ElementType, P = {}> = P & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof P | "as">;

export type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>["ref"];

// new API
export interface IGetData<T> {
  data: T;
  success: boolean;
  message?: string;
}
