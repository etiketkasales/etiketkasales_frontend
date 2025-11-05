import { ReactNode } from "react";

export interface IModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  customClickOutside?: boolean;
}
