import InputUtils from "./input.util";
import { MessageI } from "~/src/shared/model";

class FormUtils {
  static checkIfValueEmpty(value: any): boolean {
    return !value || !value.toString().trim().length;
  }

  private static getError(message: string, field: string): MessageI {
    return {
      message,
      type: "error",
      field,
    };
  }

  static getINNError(inn: string, field?: string): MessageI | null {
    const validINN = inn.length === 10 || inn.length === 12;
    if (!validINN) {
      return this.getError("Некорректный ИНН", field || "inn");
    }
    return null;
  }

  static getOGRNError(ogrn: string, field?: string): MessageI | null {
    const validOGRN = ogrn.length === 13;
    if (!validOGRN) {
      return this.getError("Некорректный ОГРН", field || "ogrn");
    }
    return null;
  }

  static getKPPError(kpp: string, field?: string): MessageI | null {
    const validKPP = kpp.length === 9;
    if (!validKPP) {
      return this.getError("Некорректный КПП", field || "kpp");
    }
    return null;
  }

  static isAllFieldsEmpty<T extends object>({ checkData }: { checkData: T }) {
    const keys = Object.keys(checkData) as (keyof T)[];
    return keys.every((key) => FormUtils.checkIfValueEmpty(checkData[key]));
  }

  static getFormError<T>({
    requiredFields,
    checkData,
    currentError,
  }: {
    requiredFields: (keyof T)[];
    checkData: T;
    currentError?: MessageI | null;
  }): MessageI | null {
    for (const field of requiredFields) {
      const value = checkData[field as keyof T];

      if (FormUtils.checkIfValueEmpty(value)) {
        if (!currentError || currentError.field !== field) {
          return {
            message: "Это поле обязательно",
            type: "error",
            field: String(field),
          };
        }
        return currentError;
      }
    }

    return null;
  }

  static getEmailError({
    email,
    emailField = "email",
  }: {
    email: string;
    emailField?: string;
  }): MessageI | null {
    if (!InputUtils.isValidEmail(email)) {
      return {
        message: "Введите корректный email",
        type: "error",
        field: emailField,
      };
    }
    return null;
  }

  static getPhoneError({
    phone,
    phoneField = "phone",
  }: {
    phone: string;
    phoneField?: string;
  }): MessageI | null {
    if (!InputUtils.isPhoneLengthValid(phone)) {
      return {
        message: "Введите корректный номер",
        type: "error",
        field: phoneField,
      };
    }
    return null;
  }

  static isFieldValid<T>(field: keyof T, data: T): boolean {
    const value = data[field as keyof T];
    return !FormUtils.checkIfValueEmpty(value);
  }
}

export default FormUtils;
