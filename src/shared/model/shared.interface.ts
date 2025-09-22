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
