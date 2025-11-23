export const getPriceWithoutCop = (price: string | number) => {
  const strPrice = String(price);
  const [rubles, cops] = strPrice.split(".");
  const [cops1, cops2] = cops.split("");
  if (cops1 === "0" && cops2 === "0") {
    return rubles;
  }
  return strPrice;
};
