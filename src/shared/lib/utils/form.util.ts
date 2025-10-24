import { MessageI } from "~/src/shared/model";
import InputUtils from "./input.util";

class FormUtils {
  static checkIfValueEmpty(value: any): boolean {
    return !value || !value.toString().trim().length;
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
    currentError: MessageI | null;
  }): MessageI | null {
    for (const field of requiredFields) {
      const value = checkData[field as keyof T];

      if (FormUtils.checkIfValueEmpty(value)) {
        if (currentError?.field !== field) {
          const newError: MessageI = {
            message: "Это поле обязательно",
            type: "error",
            field: String(field),
          };
          return newError;
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
