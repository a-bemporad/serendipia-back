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
        dbModel.nickname,
        dbModel.password
      )
    );
  }
  public async createUser(user: User): Promise<void> {
    try {
      await BaseDataBase.connection
        .insert({
          id: user.getId(),
          name: user.getName(),
          nickname: user.getNickname(),
          email: user.getEmail(),
          password: user.getPassword(),
        })
        .into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getUserByEmail(reqEmail: string): Promise<User | undefined> {
    try {
      const result = await BaseDataBase.connection.raw(`
      SELECT * FROM ${this.tableName} WHERE email = '${reqEmail}'`);

      const user = this.toModel(result[0][0]);
      return user;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getAllUsers(): Promise<User[]> {
    try {
      const result: User[] = await BaseDataBase.connection(
        this.tableName
      ).select("*");

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new UserDataBase();
