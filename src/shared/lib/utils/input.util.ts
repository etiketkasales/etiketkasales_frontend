class InputUtils {
  static validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isValidEmail(email: string): boolean {
    if (!email) return false;
    if (!email.includes("@")) return false;
    if (!InputUtils.validateEmail(email)) return false;
    return true;
  }

  static isPhoneLengthValid(phone: string): boolean {
    const digits = phone.replace(/\D/g, "");

    const normalized = digits.replace(/^8|^7/, "");
    return normalized.length === 10;
  }
}

export default InputUtils;
