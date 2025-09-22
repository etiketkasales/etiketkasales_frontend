import { FooterInfo, FooterLinkI, FooterLinkListI } from "./footer.interface";

export const policy: FooterLinkListI = {
  title: "Этикеткасейлс",
  links: [
    {
      title: "Политика обработки данных",
      link: "/personal-policy",
    },
    {
      title: "Политика конфиденциальности",
      link: "/privacy-policy",
    },
    {
      title: "Платежная информация",
      link: "/purchase-policy",
    },
  ],
};

export const greeting: FooterLinkListI = {
  title: "Знакомство с нами",
  links: [
    {
      title: "О компании",
      link: "/about",
    },
    {
      title: "Другие продукты",
      link: "/",
    },
    {
      title: "Вакансии",
      link: "/",
    },
  ],
};

export const help: FooterLinkListI = {
  title: "Помощь",
  links: [
    {
      title: "Центр поддержки",
      link: "/",
    },
    {
      title: "Партнерская программа",
      link: "/",
    },
  ],
};

export const footerInfo: FooterInfo = {
  list: [policy, greeting, help],
};
