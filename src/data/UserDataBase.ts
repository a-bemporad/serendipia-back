import { User } from "../model/user";
import BaseDataBase from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {
  protected tableName: string = "gallery_user";

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.email,
        dbModel.password,
        dbModel.nickname
      )
    );
  }
  public async createUser(user: User): Promise<void> {
    try {
      await BaseDataBase.connection.insert(user).into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getUserByEmailOrNickname(
    reqEmail?: string,
    reqNickname?: string
  ): Promise<User | undefined> {
    try {
      const result = await BaseDataBase.connection
        .select("*")
        .from(this.tableName)
        .where({ email: reqEmail })
        .orWhere({ nickname: reqNickname });

      const user = this.toModel(result);
      return user;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getAllUsers(): Promise<User[] | undefined> {
    try {
      const result: User[] = await BaseDataBase.connection
        .select("*")
        .from(this.tableName);

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new UserDataBase();
