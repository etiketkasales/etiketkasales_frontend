export interface IOrderSummaryButton {
  title: string;
  type: "yellow" | "gray-border";
  onClick?: () => void;
  disabled?: boolean;
  link?: string;
}
