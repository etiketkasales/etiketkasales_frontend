import { jwtDecode } from "jwt-decode";
import { IJwtExpanded, IJwtToken } from "~/src/shared/model";
import { jwtTokenS } from "~/src/shared/model";

class JwtUtils {
  static decodeToken(token: string | undefined): IJwtToken {
    if (!token) return jwtTokenS;
    try {
      return jwtDecode<IJwtToken>(token);
    } catch (error) {
      console.error(error);
      return jwtTokenS;
    }
  }

  /** За 2 мин до exp — для UI «скоро истечёт». */
  static checkExpired(exp: number) {
    return Date.now() > exp * 1000 - 2 * 60 * 1000;
  }

  /** Реально истёк — только после exp (не раньше на 2 мин). */
  static isExpiredToken(token: string | undefined): boolean {
    if (!token) return true;

    try {
      const decoded = this.decodeToken(token);
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      console.error(error);
      return true;
    }
  }

  static checkToken(token: string | undefined) {
    let object: IJwtExpanded = {
      sub: 0,
      phone: "",
      role: "buyer",
      iat: 0,
      exp: 0,
      isExpired: false,
    };

    if (!token) return object;
    try {
      const decoded = this.decodeToken(token);
      object = {
        ...decoded,
        isExpired: this.checkExpired(decoded.exp),
      };
      return object;
    } catch (error) {
      console.error(error);
      return object;
    }
  }
}

export default JwtUtils;
