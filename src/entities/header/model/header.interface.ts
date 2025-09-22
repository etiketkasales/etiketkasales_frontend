export interface HeaderTopItemI {
  title: string;
  link: string;
  action?: () => void;
}

export interface HeaderBottomFeatureI {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: number;
  link: string;
}
