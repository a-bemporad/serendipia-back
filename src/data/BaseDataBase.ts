import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export default class BaseDataBase {
  protected static connection: Knex = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306,
      multipleStatements: true,
    },
  });
  public static async destroyConnection(): Promise<void> {
    await BaseDataBase.connection.destroy();
  }
}
