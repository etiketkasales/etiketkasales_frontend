export interface FooterLinkListI {
  title: string;
  links: FooterLinkI[];
}

export interface FooterLinkI {
  title: string;
  link: string;
}

export interface FooterInfo {
  list: FooterLinkListI[];
}
