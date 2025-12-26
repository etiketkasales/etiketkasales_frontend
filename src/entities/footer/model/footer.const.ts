import { FooterInfo, FooterLinkListI } from "./footer.interface";

export const policy: FooterLinkListI = {
  title: "Этикеткасейлс",
  links: [
    {
      title: "Политика обработки данных",
      link: "/personal-data-policy",
    },
    {
      title: "Политика конфиденциальности",
      link: "/privacy-policy",
    },
    {
      title: "Платежная информация",
      link: "/payment-info",
    },
    {
      title: "Оплата и доставка",
      link: "/payment-delivery",
    },
  ],
};

export const greeting: FooterLinkListI = {
  title: "Знакомство с нами",
  links: [
    {
      title: "О Этикеткасейлс",
      link: "/",
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
      title: "Часто задаваемые вопросы",
      link: "/faq",
    },
    {
      title: "Партнерская программа",
      link: "/",
    },
    {
      title: "Стать продавцом",
      link: "/for-bussiness",
    },
  ],
};

export const footerInfo: FooterInfo = {
  list: [policy, greeting, help],
};
