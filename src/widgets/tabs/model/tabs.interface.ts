export interface TabsItemI {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  needDop?: "cart" | "favourites";
}
