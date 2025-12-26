import { createRoot } from "react-dom/client";

export const createYandexMapMarker = (content: React.ReactNode) => {
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(content);
  return container;
};
