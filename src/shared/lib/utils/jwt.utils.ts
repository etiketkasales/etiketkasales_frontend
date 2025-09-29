import { jwtDecode } from "jwt-decode";
import { IJwtExpanded, IJwtToken } from "../../model/shared.interface";
import { jwtTokenS } from "../../model/shared.skeleton";

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

  static checkExpired(exp: number) {
    return Date.now() > exp * 1000 - 2 * 60 * 1000;
  }

  static isExpiredToken(token: string | undefined): boolean {
    if (!token) return true;

    try {
      const decoded = this.decodeToken(token);
      return this.checkExpired(decoded.exp);
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
