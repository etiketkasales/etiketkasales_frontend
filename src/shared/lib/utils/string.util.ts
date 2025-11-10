class StringUtils {
  static pluralizeWords(forms: string[], count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;

    let form: string;

    if (mod10 === 1 && mod100 !== 11) {
      form = forms[0];
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      form = forms[1];
    } else {
      form = forms[2];
    }

    return `${count} ${form}`;
  }

  static formatDateFromApi(d: string): string {
    const [date, _] = d.split("T");
    const [year, month, day] = date.split("-");
    const fallback = (v: string, withDot?: boolean) =>
      v ? `${v}${withDot ? "." : ""}` : "";

    return `${fallback(day, true)}${fallback(month, true)}${fallback(year, false)}`;
  }

  static formatPhone(p: string): string {
    let value: string = "";
    value = p;
    if (p.includes("+")) {
      value = p.replace("+", "");
    }
    return value
      .toString()
      .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($2) $3-$4-$5");
  }

  static formatPrice(price: string | number): string {
    const n = Number(price);

    if (isNaN(n)) return "";

    // Округляем до целого
    const rounded = Math.round(n);

    // Форматируем с пробелами
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

export default StringUtils;
