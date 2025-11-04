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

    return `${day}.${month}.${year}`;
  }
}

export default StringUtils;
