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
        throw new Error("Missing input field");
      }
      if (!email.includes("@")) {
        throw new Error("Invalid email");
      }
      if (password.length < 6) {
        throw new Error("Password too short");
      }

      const userData = await this.userDataBase.getUserByEmail(email);
      //userData tem os dados que vem de procurar no banco pelo email indicado. se o email já existe,
      //userData vai conter alguma coisa, então throw error

      if (userData) {
        throw new Error("Email already used");
      }

      const id = this.idGenerator.generate();
      const cypherPassword = await this.hashManager.hashGenerator(password);
      await this.userDataBase.createUser(
        new User(id, name, email, nickname, cypherPassword)
      );
      const token = await this.tokenManager.generate({ id });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  public async logIn(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error("Missing input field");
      }
      if (!email.includes("@")) {
        throw new Error("Invalid email");
      }

      const userData = await this.userDataBase.getUserByEmail(email);

      if (!userData) {
        throw new Error("Email is not registered, please go to signup");
      }
      const verifyPassword = await this.hashManager.hashCompare(
        password,
        userData.getPassword()
      );
      if (!verifyPassword) {
        throw new Error("Invalid password");
      }

      const token = await this.tokenManager.generate({ id: userData.getId() });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  public async getAllUsers() {
    try {
      const users = await this.userDataBase.getAllUsers();
      if (users.length === 0) {
        throw new Error("No users found");
      }
      return users;
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
