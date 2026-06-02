const deliveryIcons: Record<string, string> = {
  sdek: "/order/delivery-sdek.svg",
  yandex: "/order/delivery-yandex.svg",
  russian_post: "/order/delivery-post.svg",
  courier: "/order/delivery-courier.svg",
  pickup: "/order/delivery-pickup.svg",
};

export function resolveDeliveryIcon(code: string, imageUrl?: string): string {
  const normalized = code.trim().toLowerCase();
  if (normalized && deliveryIcons[normalized]) {
    return deliveryIcons[normalized];
  }

  if (imageUrl && imageUrl.trim()) {
    return imageUrl;
  }

  return "/shared/image-src-plug.png";
}
