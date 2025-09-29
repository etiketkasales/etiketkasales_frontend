import { jwtDecode } from "jwt-decode";
import { IJwtToken } from "../../model/shared.interface";

class CookieUtils {
  private static exceptFunction(callback: () => string | undefined) {
    try {
      return callback();
    } catch (err: any) {
      if (err.message === "document is not defined") {
        return undefined;
      }
      console.error(err);
      return undefined;
    }
  }

  static getCookie(name: string): string | undefined {
    return this.exceptFunction(() => {
      if (!document) return undefined;
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
      );
      if (match) return match[2].replaceAll(`"`, "");
      return undefined;
    });
  }

  static setCookie(name: string, value: any, options?: any) {
    return this.exceptFunction(() => {
      if (document) {
        options = {
          path: "/",
          ...options,
        };

        let updatedCookie: string = String(name) + "=" + String(value);

        for (const optionKey in options) {
          updatedCookie += "; " + optionKey;
          const optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }

        document.cookie = updatedCookie;
        return undefined;
      }
    });
  }

  static setCookieWithToken(name: string, token: string, options?: any) {
    return this.exceptFunction(() => {
      if (document) {
        const decoded = jwtDecode<IJwtToken>(token);
        const expiresIn = decoded.exp * 1000 - Date.now();

        if (expiresIn <= 0) {
          console.warn(`Токен ${name} уже истек`);
          return;
        }

        options = {
          path: "/",
          "Max-Age": Math.floor(expiresIn / 1000),
          Secure: true,
          SameSite: "lax",
          ...options,
        };

        let updatedCookie =
          encodeURIComponent(name) + "=" + encodeURIComponent(token);
        Object.keys(options).forEach((key) => {
          updatedCookie += "; " + key;
          const optionValue = options[key];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        });

        document.cookie = updatedCookie;
        return undefined;
      }
    });
  }

  static deleteCookie(name: string) {
    return this.exceptFunction(() => {
      if (document) {
        this.setCookie(name, "", {
          "max-age": -1,
        });
        return undefined;
      }
    });
  }
}

export default CookieUtils;
