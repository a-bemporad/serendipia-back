import { Request, Response } from "express";
import userBusiness from "../business/UserBusiness";

export class UserController {
  public async signUp(req: Request, res: Response) {
    try {
      const { name, email, nickname, password } = req.body;
      const result = await userBusiness.signUp(name, email, nickname, password);
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }

  public async logIn(req: Request, res: Response) {
    const { emailOrNickname, password } = req.body;
    const result = await userBusiness.logIn(emailOrNickname, password);
    res.status(200).send(result);
    try {
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
}
