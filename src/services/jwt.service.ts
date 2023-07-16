import jwt from "jsonwebtoken";
import { RefreshSecret, AccessSecret } from "../config";
export default class JwtService {
  // Access token generation
  public accessTokenGenerator(userDetails: string): any {
    return new Promise((resolve, reject) => {
      const payload = {
        name: "User-Service",
        iss: "TechSciVerse.com",
      };
      const options = {
        audience: userDetails,
        expiresIn: "10s",
      };
      jwt.sign(payload, AccessSecret, options, (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      });
    });
  }

  //Refresh token generation
  public refreshTokenGenerator(userDetails: string): any {
    return new Promise((resolve, reject) => {
      const payload = {
        name: "User-Service",
        iss: "TechSciVerse.com",
      };
      const options = {
        audience: userDetails,
        expiresIn: "3d",
      };

      jwt.sign(payload, RefreshSecret, options, (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      });
    });
  }

  //Verify access token
  public accessTokenVerify(token: any): any {
    return jwt.verify(token, AccessSecret, (err: any, payload: any): any => {
      if (err) return { error: err };
      return payload;
    });
  }
  public refreshTokenVerify(token: any, userDetails: string): any {}
}
