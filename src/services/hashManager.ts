import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashManager {
  public hashGenerator = async (plainText: string): Promise<string> => {
    const rounds: number = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(plainText, salt);

    return hash;
  };

  public hashCompare = async (
    plainText: string,
    hash: string
  ): Promise<boolean> => {
    return bcrypt.compare(plainText, hash);
  };
}

export default new HashManager();
