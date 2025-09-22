export const usePhoneInput = () => {
  const formatInput = (value: string): string => {
    let digits = value.replace(/\D/g, "");
    digits = digits.replace("7", "");

    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    } else if (!digits.startsWith("7")) {
      digits = "7" + digits;
    }

    digits = digits.slice(0, 11);

    let formatted = "";
    if (digits.length > 1) {
      formatted += " " + digits.slice(1, 4);
    }
    if (digits.length >= 4) {
      formatted += " " + digits.slice(4, 7);
    }
    if (digits.length >= 7) {
      formatted += " " + digits.slice(7, 9);
    }
    if (digits.length >= 9) {
      formatted += " " + digits.slice(9, 11);
    }
    if (formatted.endsWith(" ")) {
      formatted = formatted.slice(0, -1);
    }

    return `+7 ${formatted}`;
  };

  const formatForApi = (input: string): string => {
    const digits = input.replace(/\D/g, "");

    if (digits.startsWith("7") && digits.length === 11) {
      return digits;
    }

    if (digits.startsWith("8") && digits.length === 11) {
      return "7" + digits.slice(1);
    }

    if (digits.length === 10) {
      return "7" + digits;
    }

    return digits;
  };

  return {
    formatInput,
    formatForApi,
  };
};
