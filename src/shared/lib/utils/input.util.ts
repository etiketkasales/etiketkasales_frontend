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

  static createInput() {
    return {
      createStringInput: this.createStringInput,
      createNumberInput: this.createNumberInput,
    };
  }

  static createArbitraryInput<InputType, FieldsType>(
    field: keyof FieldsType,
    placeholder: string,
    options?: any,
  ): InputType {
    const input: InputType = {
      field,
      placeholder,
      ...options,
    };
    return input;
  }

  static createNumberInput<T, Fields>(
    field: keyof Fields,
    placeholder: string,
    options?: any,
  ): T {
    return {
      placeholder,
      field,
      type: "number",
      ...options,
    } as T;
  }
  static createStringInput<T, Fields>(
    field: keyof Fields,
    placeholder: string,
    options?: any,
  ): T {
    return {
      placeholder,
      field,
      type: "string",
      ...options,
    } as T;
  }
}

export const { createStringInput, createNumberInput } =
  InputUtils.createInput();
export default InputUtils;
