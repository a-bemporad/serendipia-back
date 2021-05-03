import { UserDataBase } from "../data/UserDataBase";
import { User } from "../model/user";
import { HashManager } from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager,
    private userDataBase: UserDataBase
  ) {}
  public async signUp(
    name: string,
    email: string,
    nickname: string,
    password: string
  ) {
    try {
      if (!name || !email || !nickname || !password) {
        throw new Error("Missing input fiel");
      }
      if (!email.includes("@")) {
        throw new Error("Invalid email");
      }
      if (password.length < 6) {
        throw new Error("Password too short");
      }

      const userData = await this.userDataBase.getUserByEmail(email);
      // tenho que ver se realmente isso vale, falar userData
      if (userData) {
        throw new Error("Email already used");
      }

      const id = this.idGenerator.generate();
      const cypherPassword = await this.hashManager.hashGenerator(password);
      await this.userDataBase.createUser(
        new User(id, name, email, nickname, cypherPassword)
      );
      const token = this.tokenManager.generate({ id });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  public async logIn(password: string, email?: string, nickname?: string) {
    try {
      //não tenho certeza se essa é a sintaxe :) testar
      if ((!email && !nickname) || !password) {
        throw new Error("All fields must be filled");
      }
      if (email && !email.includes("@")) {
        throw new Error("Invalid email");
      }
      //acho que pode dar problema aqui, mas não tenho certeza, ficar de olho
      const userData = await this.userDataBase.getUserByEmailOrNickname(
        email,
        nickname
      );
      const id: string = userData?.getId() as string;

      if (!userData) {
        throw new Error("Email not registered, go to sign up");
      }

      const verifiedPassword = await this.hashManager.hashCompare(
        password,
        userData.getPassword()
      );
      if (!verifiedPassword) {
        throw new Error("Invalid password");
      }

      const token = this.tokenManager.generate({ id });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  public async getAllUsers() {
    try {
      const users = await this.userDataBase.getAllUsers();
      if (!users) {
        throw new Error("No users found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserBusiness(
  new IdGenerator(),
  new TokenManager(),
  new HashManager(),
  new UserDataBase()
);
