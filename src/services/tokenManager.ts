import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class TokenManager {
  private static expiresIn = process.env.JWT_EXPT;
  private static key: string = process.env.JWT_KEY as string;

  public generate = (payload: AuthenticationData): string => {
    const token = jwt.sign(payload, TokenManager.key, {
      expiresIn: TokenManager.expiresIn,
    });

    return token;
  };

  public verify = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, TokenManager.key) as any;
    const result: AuthenticationData = { id: payload.id };

    return result;
  };
}

export interface AuthenticationData {
  id: string;
}

export default new TokenManager();
