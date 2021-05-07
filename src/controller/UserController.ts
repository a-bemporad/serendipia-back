import { Request, Response } from "express";
import userBusiness from "../business/UserBusiness";
import { User } from "../model/user";

export class UserController {
  public async signUp(req: Request, res: Response) {
    try {
      const { name, email, nickname, password } = req.body;
      const result = await userBusiness.signUp(name, email, nickname, password);
      res.status(200).send({ message: "User created!", token: result });
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
  public async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userBusiness.logIn(email, password);
      res
        .status(200)
        .send({ message: "Successfully logged in", token: result });
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userBusiness.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
}

export default new UserController();
